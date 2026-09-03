/**
 * One-time migration of the site's static content images into Cloudflare R2,
 * so they're served directly by R2 (zero egress fees) instead of through
 * Vercel. Raster images are re-encoded as WebP; the one SVG is uploaded as-is
 * (vector, no format conversion).
 *
 * Deterministic keys, no random suffix — re-running overwrites in place, so
 * updating a site asset later is just: replace the file, run this again.
 *
 *   npm run migrate:images
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const WEBP_QUALITY = 82;
const MAX_DIMENSION = 2000;

// [local path relative to repo root, R2 key]
const RASTER_IMAGES: [string, string][] = [
  ["public/images/about-bg.png", "site/images/about-bg.webp"],
  ["public/images/blog/av-tech.png", "site/images/blog/av-tech.webp"],
  ["public/images/blog/managed-it.png", "site/images/blog/managed-it.webp"],
  ["public/images/blog/teams-zoom.png", "site/images/blog/teams-zoom.webp"],
  ["public/images/products/desktop.png", "site/images/products/desktop.webp"],
  ["public/images/products/laptop.png", "site/images/products/laptop.webp"],
  ["public/images/products/motherboard.png", "site/images/products/motherboard.webp"],
  ["public/images/products/power-supply.png", "site/images/products/power-supply.webp"],
  ["public/images/products/router.png", "site/images/products/router.webp"],
  ["public/images/products/server-ram.png", "site/images/products/server-ram.webp"],
  ["public/images/sample_about_us.png", "site/images/sample_about_us.webp"],
  ["public/images/wcu/solutions.png", "site/images/wcu/solutions.webp"],
  ["public/workspace-wallpaper.jpg", "site/workspace-wallpaper.webp"],
];

const VECTOR_IMAGES: [string, string][] = [["public/india-map.svg", "site/india-map.svg"]];

function client(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

async function main() {
  const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "R2_PUBLIC_URL"];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(", ")}. Run \`vercel env pull .env.local\` first.`);
  }

  const s3 = client();
  const bucket = process.env.R2_BUCKET_NAME!;
  const publicBase = process.env.R2_PUBLIC_URL!.replace(/\/+$/, "");
  const mapping: Record<string, string> = {};

  let totalBefore = 0;
  let totalAfter = 0;

  console.log(`Converting and uploading ${RASTER_IMAGES.length} raster images…\n`);

  for (const [localPath, key] of RASTER_IMAGES) {
    const original = await readFile(path.resolve(localPath));
    const image = sharp(original).rotate(); // .rotate() with no args auto-orients from EXIF, then strips it
    const metadata = await image.metadata();

    const resized =
      metadata.width && metadata.width > MAX_DIMENSION
        ? image.resize({ width: MAX_DIMENSION, withoutEnlargement: true })
        : image;

    const converted = await resized.webp({ quality: WEBP_QUALITY }).toBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: converted,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const url = `${publicBase}/${key}`;
    mapping[`/${localPath.replace(/^public\//, "")}`] = url;

    const before = original.length;
    const after = converted.length;
    totalBefore += before;
    totalAfter += after;

    const savedPct = Math.round((1 - after / before) * 100);
    console.log(
      `  ${localPath} (${(before / 1024).toFixed(0)}KB) -> ${key} (${(after / 1024).toFixed(0)}KB, -${savedPct}%)`,
    );
  }

  console.log(`\nUploading ${VECTOR_IMAGES.length} vector image(s) as-is…\n`);

  for (const [localPath, key] of VECTOR_IMAGES) {
    const original = await readFile(path.resolve(localPath));

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: original,
        ContentType: "image/svg+xml",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const url = `${publicBase}/${key}`;
    mapping[`/${localPath.replace(/^public\//, "")}`] = url;
    totalBefore += original.length;
    totalAfter += original.length;

    console.log(`  ${localPath} (${(original.length / 1024).toFixed(0)}KB) -> ${key}`);
  }

  console.log(
    `\nDone. ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB ` +
      `(${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller).\n`,
  );

  console.log("Path -> R2 URL mapping (for the code rewiring step):\n");
  console.log(JSON.stringify(mapping, null, 2));
}

main().catch((error) => {
  console.error("\nMigration failed:", error);
  process.exit(1);
});

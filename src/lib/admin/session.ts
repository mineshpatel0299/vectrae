import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "vectrae_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export type AdminRole = "owner" | "admin" | "editor";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  /** Mirrors `admin_users.session_version`, so tokens can be revoked. */
  sessionVersion: number;
};

const ISSUER = "vectrae-admin";

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (needs >= 32 characters). Generate one with `openssl rand -base64 48`.",
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
    sv: payload.sessionVersion,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

/** Returns null for any token that is absent, malformed, expired, or unsigned by us. */
export async function readSessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret(), { issuer: ISSUER });

    return toSessionPayload(payload);
  } catch {
    return null;
  }
}

function toSessionPayload(payload: JWTPayload): SessionPayload | null {
  const { sub, email, name, role, sv } = payload as JWTPayload & {
    email?: unknown;
    name?: unknown;
    role?: unknown;
    sv?: unknown;
  };

  if (
    typeof sub !== "string" ||
    typeof email !== "string" ||
    typeof name !== "string" ||
    typeof sv !== "number" ||
    (role !== "owner" && role !== "admin" && role !== "editor")
  ) {
    return null;
  }

  return { userId: sub, email, name, role, sessionVersion: sv };
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
} as const;

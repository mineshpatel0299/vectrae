import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/lib/admin/session";

/**
 * A cheap first gate for the admin panel: it bounces obviously-signed-out
 * requests before they ever render. It is *not* the authorisation boundary —
 * every admin page and mutation independently re-verifies the session against
 * the database via `getCurrentAdmin()`.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // The login page decides for itself whether to bounce an already-signed-in
  // visitor onward — it re-checks against the database (see its `page.tsx`).
  // Doing that redirect here too, off the JWT signature alone, is what causes
  // a loop: a cookie that is signature-valid but database-stale (e.g. after a
  // password reset bumps `session_version`) would get sent right back here by
  // `/admin`, and right back to `/admin` by this same shallow check.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    const target = `${pathname}${search}`;

    if (target !== "/admin") {
      loginUrl.searchParams.set("next", target);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!api/).*)"],
};

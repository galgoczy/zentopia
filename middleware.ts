import { NextResponse, type NextRequest } from "next/server";

// Country-based default locale routing.
// HU IP → "/" (Hungarian). Anything else (or unknown) → "/en".
// Only redirects on first visit. After that, the visitor's own choice
// (via LangSwitch) is respected and we never auto-redirect again.

const COOKIE = "zen-locale-routed";

function getCountry(req: NextRequest): string | undefined {
  // 1. Vercel-injected geo info (request.geo.country)
  const fromGeo = (req as any).geo?.country as string | undefined;
  if (fromGeo) return fromGeo;
  // 2. Common platform headers (Vercel / Cloudflare / generic)
  const candidates = [
    req.headers.get("x-vercel-ip-country"),
    req.headers.get("cf-ipcountry"),
    req.headers.get("x-country"),
  ];
  for (const c of candidates) {
    if (c && c !== "XX" && c !== "T1") return c.toUpperCase();
  }
  return undefined;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only consider the entry pages — we don't want to redirect anchors,
  // search-engine crawls of /en, or API routes. (The matcher below
  // already excludes most of these, but be explicit.)
  if (pathname !== "/" && pathname !== "/en") return NextResponse.next();

  // If the visitor has already been auto-routed once (or used the switch),
  // respect that and stop interfering.
  if (req.cookies.get(COOKIE)) return NextResponse.next();

  const country = getCountry(req);
  const wantsHu = country === "HU";
  const isOnHu = pathname === "/";
  const isOnEn = pathname === "/en";

  // Redirect non-HU visitors landing on / to /en. Don't touch /en visitors.
  if (!wantsHu && isOnHu) {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, "1", {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    });
    return res;
  }

  // For HU visitors on / and any visitor on /en, just mark routed.
  const res = NextResponse.next();
  res.cookies.set(COOKIE, "1", {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

export const config = {
  matcher: ["/", "/en"],
};

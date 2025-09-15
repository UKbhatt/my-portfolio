// lib/parseProfile.ts
export function parseHandle(input: string | null | undefined, site: "cf" | "lc" | "gh"): string {
  if (!input) return "";
  const s = input.trim();
  if (!/^https?:\/\//i.test(s)) return s;

  try {
    const u = new URL(s);

    if (site === "cf" && u.hostname.includes("codeforces.com")) {
      const m = u.pathname.match(/^\/profile\/([^/]+)\/?$/i);
      if (m) return decodeURIComponent(m[1]);
    }

    if (site === "lc" && u.hostname.includes("leetcode.com")) {
      const seg = u.pathname.split("/").filter(Boolean);
      return decodeURIComponent(seg[0] === "u" ? (seg[1] ?? "") : (seg[0] ?? ""));
    }

    if (site === "gh" && u.hostname === "github.com") {
      const seg = u.pathname.split("/").filter(Boolean);
      if (seg.length >= 1) return decodeURIComponent(seg[0]);
    }
  } catch {}

  return "";
}

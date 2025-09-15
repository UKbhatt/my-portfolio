// app/api/stats/aggregate/route.ts
import { NextResponse } from "next/server";
import { parseHandle } from "@/lib/parseProfile";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = url.origin;

  const cf = parseHandle(url.searchParams.get("cf") || "", "cf");
  const lc = parseHandle(url.searchParams.get("lc") || "", "lc");
  const gh = parseHandle(url.searchParams.get("gh") || "", "gh");

  const reqs: Array<Promise<Response | null>> = [
    cf ? fetch(`${origin}/api/stats/codeforces/${encodeURIComponent(cf)}`, { cache: "no-store" }) : Promise.resolve(null),
    lc ? fetch(`${origin}/api/stats/leetcode/${encodeURIComponent(lc)}`,   { cache: "no-store" }) : Promise.resolve(null),
    gh ? fetch(`${origin}/api/stats/github/${encodeURIComponent(gh)}`,     { cache: "no-store" }) : Promise.resolve(null),
  ];

  const [cfRes, lcRes, ghRes] = await Promise.all(reqs);

  const safe = async (res: Response | null) => {
    if (!res || !res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) return null;
    return res.json();
  };

  const cfJson = await safe(cfRes);
  const lcJson = await safe(lcRes);
  const ghJson = await safe(ghRes);

  const totalDSA = (cfJson?.uniqueAccepted ?? 0) + (lcJson?.totalSolved ?? 0);

  return NextResponse.json({
    codeforces: cfJson,
    leetcode: lcJson,
    github: ghJson,
    totalDSA,
  });
}

// app/api/stats/leetcode/[username]/route.ts
import { NextResponse } from "next/server";

async function fetchMirror(username: string) {
  const r = await fetch(`https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`, {
    headers: { "cache-control": "no-store" },
  });
  if (!r.ok) return null;
  return r.json();
}

async function fetchContestTopPercent(username: string) {
  // Official LC GraphQL: userContestRanking → topPercentage & rating
  const query = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        rating
        topPercentage
      }
    }
  `;
  const r = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
  });
  if (!r.ok) return null;
  const j = await r.json();
  return j?.data?.userContestRanking ?? null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const [mirror, contest] = await Promise.all([
      fetchMirror(username),
      fetchContestTopPercent(username),
    ]);

    return NextResponse.json({
      username,
      totalSolved: mirror?.totalSolved ?? 0,
      easySolved: mirror?.easySolved ?? 0,
      mediumSolved: mirror?.mediumSolved ?? 0,
      hardSolved: mirror?.hardSolved ?? 0,
      ranking: mirror?.ranking ?? null,
      contestRating: contest?.rating ?? null,
      topPercentage: contest?.topPercentage ?? null, // e.g., 5.123 means top 5.123%
    });
  } catch {
    return NextResponse.json({
      username,
      totalSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0, ranking: null, contestRating: null, topPercentage: null,
    }, { status: 200 });
  }
}

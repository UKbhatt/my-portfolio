import { NextResponse } from "next/server";

type CFSubmission = {
  verdict?: string;
  creationTimeSeconds?: number;
  problem?: { contestId?: number; index?: string };
};

type CFUserInfo = {
  handle: string;
  rating?: number;
  rank?: string;
  maxRating?: number;
  maxRank?: string;
};

type CFRatingUpdate = { contestId: number; newRating: number };

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;

  try {
    const [subsRes, infoRes, histRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}`),
      fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`)
    ]);

    if (!subsRes.ok || !infoRes.ok || !histRes.ok) {
      return NextResponse.json({ handle, uniqueAccepted: 0, contestsParticipated: 0 }, { status: 200 });
    }

    const subsJson = await subsRes.json();
    const infoJson = await infoRes.json();
    const histJson = await histRes.json();

    const info: CFUserInfo = infoJson?.result?.[0] ?? { handle };

    // Unique AC set
    const okSubs: CFSubmission[] = (subsJson?.result ?? []).filter((s: CFSubmission) => s?.verdict === "OK");
    const uniq = new Set<string>();
    const acDay = new Set<string>(); // YYYY-MM-DD
    for (const s of okSubs) {
      const key = `${s.problem?.contestId ?? 0}-${s.problem?.index ?? ""}`;
      uniq.add(key);
      if (s.creationTimeSeconds) {
        const day = new Date(s.creationTimeSeconds * 1000).toISOString().slice(0, 10);
        acDay.add(day);
      }
    }

    // Max streak of consecutive days with any AC
    const days = Array.from(acDay).sort(); // ISO strings sort lexicographically by date
    let maxStreak = 0, curStreak = 0, prev: string | null = null;
    for (const d of days) {
      if (!prev) {
        curStreak = 1;
      } else {
        const prevDate = new Date(prev);
        const curDate = new Date(d);
        const diff = (curDate.getTime() - prevDate.getTime()) / (24 * 3600 * 1000);
        curStreak = diff === 1 ? curStreak + 1 : 1;
      }
      if (curStreak > maxStreak) maxStreak = curStreak;
      prev = d;
    }

    const history: CFRatingUpdate[] = histJson?.result ?? [];
    const contestsParticipated = history.length;

    return NextResponse.json({
      handle: info.handle,
      uniqueAccepted: uniq.size,
      rating: info.rating ?? null,
      rank: info.rank ?? null,
      maxRating: info.maxRating ?? null,
      maxRank: info.maxRank ?? null,
      contestsParticipated,
      maxStreakDays: maxStreak,
    });
  } catch {
    return NextResponse.json({ handle, uniqueAccepted: 0, contestsParticipated: 0 }, { status: 200 });
  }
}

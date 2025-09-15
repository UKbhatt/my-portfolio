"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StatCardPro from "./statCardPro";
import leetcode from "../../public/leetcode.png"
import github from "../../public/github.png"
import codeforces from "../../public/codeforces.jpeg"

type Agg = {
  totalDSA: number;
  codeforces?: {
    handle: string;
    uniqueAccepted: number;
    rating?: number | null;
    rank?: string | null;
    maxRating?: number | null;
    maxRank?: string | null;
    contestsParticipated?: number;
    maxStreakDays?: number;
  };
  leetcode?: {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking?: number | null;
    contestRating?: number | null;
    topPercentage?: number | null;
  };
  github?: {
    username: string;
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    languages?: { language: string; count: number }[];
  };
};

function StatCard({
  title, value, subtitle, details = [], href, accent, icon
}: {
  title: string;
  value: number | string;
  subtitle?: string;
  details?: string[];
  href?: string;
  accent: string;
  icon?: React.ReactNode;
}) {
  const content = (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/[0.07] transition-colors">
      <div className="flex items-center gap-2 text-base text-white/80 font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="mt-1 text-4xl font-extrabold">{value}</div>
      {subtitle && <div className="mt-2 text-sm text-white/60">{subtitle}</div>}
      {details.length > 0 && (
        <ul className="mt-3 text-xs text-white/70 space-y-1">
          {details.map((d, i) => <li key={i}>• {d}</li>)}
        </ul>
      )}
      <div className={`mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r ${accent}`} />
    </div>
  );
  return href ? <Link href={href} target="_blank">{content}</Link> : content;
}

export default function StatsSection({
  cfHandle,
  lcUser,
  ghUser,
}: { cfHandle: string; lcUser: string; ghUser: string }) {
  const [data, setData] = useState<Agg | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = new URLSearchParams();
    if (cfHandle) q.set("cf", cfHandle);
    if (lcUser) q.set("lc", lcUser);
    if (ghUser) q.set("gh", ghUser);

    const url = q.toString() ? `/api/stats/aggregate?${q.toString()}` : `/api/stats/aggregate`;

    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [cfHandle, lcUser, ghUser]);

  const total = useMemo(() => data?.totalDSA ?? 0, [data]);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
  <StatCardPro
    kind="codeforces"
    title="Codeforces"
    iconSrc={codeforces}
    accent="from-blue-500 to-indigo-500"
    href={data?.codeforces?.handle ? `https://codeforces.com/profile/${encodeURIComponent(data.codeforces.handle)}` : undefined}
    loading={loading}
    codeforces={data?.codeforces}
  />
  <StatCardPro
    kind="leetcode"
    title="LeetCode"
    iconSrc= {leetcode}
    accent="from-amber-400 to-yellow-500"
    href={data?.leetcode?.username ? `https://leetcode.com/${encodeURIComponent(data.leetcode.username)}/` : undefined}
    loading={loading}
    leetcode={data?.leetcode}
  />
  <StatCardPro
    kind="github"
    title="GitHub"
    iconSrc={github}
    accent="from-emerald-500 to-teal-500"
    href={data?.github?.username ? `https://github.com/${encodeURIComponent(data.github.username)}` : undefined}
    loading={loading}
    github={data?.github}
  />
</div>
      
  );
}

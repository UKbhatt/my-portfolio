"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type CF = {
  handle: string;
  uniqueAccepted: number;
  rating?: number | null;
  rank?: string | null;
  maxRating?: number | null;
  maxRank?: string | null;
  contestsParticipated?: number;
  maxStreakDays?: number;
};

type LC = {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking?: number | null;
  contestRating?: number | null;
  topPercentage?: number | null;
};

type GH = {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  languages?: { language: string; count: number }[];
};

export type StatCardProProps = {
  kind: "codeforces" | "leetcode" | "github";
  title?: string;
  accent: string; // e.g. "from-blue-500 to-indigo-500"
  iconSrc: StaticImageData;
  href?: string;
  loading?: boolean;
  codeforces?: CF;
  leetcode?: LC;
  github?: GH;
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
    {children}
  </span>
);

// Decorative, consistent footer mini-bar for all cards
const FooterMiniBar = ({ accent }: { accent: string }) => (
  <div className="mt-6">
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div className={`h-full w-full bg-gradient-to-r ${accent}`} />
    </div>
  </div>
);

const Line = () => <div className="h-px w-full bg-white/10" />;

export default function StatCardPro({
  kind,
  title,
  accent,
  iconSrc,
  href,
  loading,
  codeforces,
  leetcode,
  github,
}: StatCardProProps) {
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/[0.07] transition-colors">
      {children}
      {/* consistent mini bar at the bottom for every card */}
      <FooterMiniBar accent={accent} />
    </div>
  );

  // Head with icon + title
  const Head = (
    <div className="flex items-center gap-2 text-base text-white/85 font-semibold">
      <Image src={iconSrc} alt={`${kind} icon`} width={22} height={22} />
      <span>{title ?? kind[0].toUpperCase() + kind.slice(1)}</span>
    </div>
  );

  // Clickable wrapper if href is provided
  const Wrap = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <Link
        href={href}
        target="_blank"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
      >
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  // --- Loading: use logo as loader ---
  if (loading) {
    return (
      <Container>
        <div className="flex items-center gap-2 text-base text-white/70 font-semibold">
          <Image src={iconSrc} alt="loader icon" width={22} height={22} className="opacity-80" />
          <span>Loading…</span>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <Image
            src={iconSrc}
            alt="loading"
            width={40}
            height={40}
            className="animate-spin opacity-80"
            priority
          />
        </div>
      </Container>
    );
  }

  if (kind === "codeforces" && codeforces) {
    const cf = codeforces;
     const currentColor =
    cf.rating == null
      ? "bg-gray-100/0 text-white/80"
      : cf.rating < 1200
      ? "bg-white/5 text-white/80"
      : cf.rating < 1400
      ? "bg-green-100/10 text-green-400"
      : cf.rating < 1600
      ? "bg-cyan-100/10 text-cyan-400"
      : cf.rating < 1900
      ? "bg-blue-100/10 text-blue-400"
      : cf.rating < 2100
      ? "bg-violet-100/10 text-violet-400"
      : cf.rating < 2300
      ? "bg-orange-100/10 text-orange-400"
      : cf.rating < 2400
      ? "bg-red-100/10 text-red-400"
      : "bg-yellow-100/10 text-yellow-400 font-semibold";

    return (
      <Container>
        <Wrap>
          {Head}
          <div className="mt-1 text-4xl font-extrabold">{cf.uniqueAccepted}</div>
          <div className="mt-1 text-sm text-white/60">Problems</div>

          <div className="mt-4 space-y-3 text-sm font-medium">
            {cf.rank && (
              <div className={`flex justify-between rounded-lg px-3 py-2 shadow-sm ${currentColor}`}>
                <span>Current</span>
                <span>
                  {cf.rank} {cf.rating ? `(${cf.rating})` : ""}
                </span>
              </div>
            )}

            {(cf.maxRank || cf.maxRating) && (
              <div className="flex justify-between rounded-lg px-3 py-2 shadow-sm bg-indigo-100/10 text-indigo-300">
                <span>Highest</span>
                <span>
                  {cf.maxRank ?? "-"} {cf.maxRating ? `(${cf.maxRating})` : ""}
                </span>
              </div>
            )}

            <div className="flex justify-between rounded-lg px-3 py-2 shadow-sm bg-emerald-100/10 text-emerald-300">
              <span>Contests</span>
              <span>{cf.contestsParticipated ?? 0}</span>
            </div>

            <div className="flex justify-between rounded-lg px-3 py-2 shadow-sm bg-rose-100/10 text-rose-300">
              <span>Max Streak</span>
              <span>{cf.maxStreakDays ?? 0} days</span>
            </div>
          </div>
        </Wrap>
      </Container>
    );
  }

  if (kind === "leetcode" && leetcode) {
    const lc = leetcode;
    return (
      <Container>
        <Wrap>
          {Head}
          <div className="mt-1 text-4xl font-extrabold">{lc.totalSolved}</div>
          <div className="mt-1 text-sm text-white/60">Total Solved</div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-green-400">Easy</span>
              <span>{lc.easySolved}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-yellow-400">Medium</span>
              <span>{lc.mediumSolved}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-red-400">Hard</span>
              <span>{lc.hardSolved}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm font-medium">
            {typeof lc.topPercentage === "number" && (
              <div className="flex items-center gap-2 rounded-lg bg-purple-100/10 px-3 py-2 text-purple-300 shadow-sm">
                <span className="text-xs">🏆</span>
                <span>Top {lc.topPercentage.toFixed(2)}%</span>
              </div>
            )}

            {lc.contestRating && (
              <div className="flex items-center gap-2 rounded-lg bg-amber-100/10 px-3 py-2 text-amber-300 shadow-sm">
                <span className="text-xs">⚡</span>
                <span>Contest Rating: {Math.round(lc.contestRating)}</span>
              </div>
            )}
          </div>


        </Wrap>
      </Container>
    );
  }

  if (kind === "github" && github) {
    const gh = github;
    return (
      <Container>
        <Wrap>
          {Head}
          <div className="mt-1 text-4xl font-extrabold">{gh.publicRepos}</div>
          <div className="mt-1 text-sm text-white/60">Public Repositories</div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>⭐ Stars: {gh.totalStars}</Badge>
            <Badge>👥 Followers: {gh.followers}</Badge>
            <Badge>➡ Following: {gh.following}</Badge>
          </div>

          {gh.languages && gh.languages.length > 0 && (
            <>
              <div className="mt-4"><Line /></div>
              <div className="mt-4">
                <div className="text-sm text-white/70 mb-2">Top Languages (by repo primary language)</div>
                <div className="grid grid-cols-1 gap-2">
                  {gh.languages.slice(0, 5).map((l) => (
                    <div key={l.language} className="flex items-center justify-between text-[12px]">
                      <span className="text-white/80">{l.language}</span>
                      <span className="text-white/60">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Wrap>
      </Container>
    );
  }

  return (
    <Container>
      {Head}
      <div className="mt-3 text-sm text-white/60">No data available.</div>
    </Container>
  );
}

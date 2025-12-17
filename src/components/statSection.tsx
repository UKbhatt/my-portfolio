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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                iconSrc={leetcode}
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

import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params; 

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: { "User-Agent": "Portfolio-Stats" },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        { headers: { "User-Agent": "Portfolio-Stats" } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        {
          username,
          publicRepos: 0,
          followers: 0,
          following: 0,
          totalStars: 0,
          languages: [],
        },
        { status: 200 }
      );
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = (repos ?? []).reduce(
      (acc: number, r: any) => acc + (r?.stargazers_count ?? 0),
      0
    );

    const langCount: Record<string, number> = {};
    for (const r of repos ?? []) {
      const lang = r?.language;
      if (lang) langCount[lang] = (langCount[lang] ?? 0) + 1;
    }
    const languages = Object.entries(langCount)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      username,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      totalStars,
      languages,
    });
  } catch {
    return NextResponse.json(
      {
        username,
        publicRepos: 0,
        followers: 0,
        following: 0,
        totalStars: 0,
        languages: [],
      },
      { status: 200 }
    );
  }
}

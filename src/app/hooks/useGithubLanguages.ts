import { useState, useEffect } from 'react';

interface Language {
  name: string;
  percentage: number;
}

const useGitHubLanguages = (username: string) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const repos = await reposResponse.json();

        // Fetch languages for each repository
        const languageCounts: { [key: string]: number } = {};
        let totalSize = 0;

        for (const repo of repos) {
          const langResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          });
          if (!langResponse.ok) continue;
          const repoLanguages = await langResponse.json();

          for (const [lang, size] of Object.entries(repoLanguages)) {
            languageCounts[lang] = (languageCounts[lang] || 0) + (size as number);
            totalSize += size as number;
          }
        }

        // Calculate percentages
        const languagePercentages = Object.entries(languageCounts)
          .map(([name, size]) => ({
            name,
            percentage: (size / totalSize) * 100
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 5);  // Get top 5 languages

        setLanguages(languagePercentages);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, [username]);

  return { languages, isLoading, error };
};

export default useGitHubLanguages;
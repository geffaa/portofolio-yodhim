import { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

interface Repo {
  id: number;
  name: string;
  language: string | null;
  // Add other properties as needed, omitting unused ones
}

interface LanguagePercentage {
  name: string;
  percentage: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  const cachedData = cache.get<LanguagePercentage[]>(username);
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error('Failed to fetch repositories');
    const repos: Repo[] = await response.json();

    // Process data to get language percentages
    const languageCounts = repos.reduce((acc: Record<string, number>, repo) => {
      const { language } = repo;
      if (language) {
        acc[language] = (acc[language] || 0) + 1;
      }
      return acc;
    }, {});

    const totalRepos = repos.length;
    const languagePercentages: LanguagePercentage[] = Object.entries(languageCounts).map(([name, count]) => ({
      name,
      percentage: (count / totalRepos) * 100
    }));

    cache.set(username, languagePercentages);
    res.status(200).json(languagePercentages);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}
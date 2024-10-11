// pages/api/github-languages.ts
import { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username } = req.query;
  
    if (typeof username !== 'string') {
      return res.status(400).json({ error: 'Invalid username' });
    }
  
    const cachedData = cache.get(username);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      const repos = await response.json();

    // Process data to get language percentages
    const languagePercentages = repos.reduce((acc: { [key: string]: number }, repo: any) => {
      const { language } = repo;
      if (language) {
        if (!acc[language]) {
          acc[language] = 0;
        }
        acc[language] += 1;
      }
      return acc;
    }, {});

    const languageArray = Object.entries(languagePercentages).map(([name, percentage]) => ({
      name,
      percentage
    }));
    
    cache.set(username, languageArray);
    res.status(200).json(languageArray);

    // Convert counts to percentages
    const totalRepos = repos.length;
    for (const language in languagePercentages) {
      languagePercentages[language] = (languagePercentages[language] / totalRepos) * 100;
    }

    cache.set(username, languagePercentages);
    res.status(200).json(languagePercentages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}
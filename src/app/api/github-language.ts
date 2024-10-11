// pages/api/github-languages.ts
import { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// src/app/api/github-language.ts

interface Repo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
}

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
    const languagePercentages = repos.reduce((acc: { [key: string]: number }, repo: Repo) => {
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
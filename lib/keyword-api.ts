export interface KeywordData {
  keyword: string;
  volume: number;
  competition: string;
  cpc?: number;
}

export interface KeywordResult {
  platform: 'amazon' | 'flipkart';
  keywords: KeywordData[];
  formattedString: string;
}

// Mock API simulation - replace with real API calls
export const fetchKeywordData = async (
  seedKeyword: string,
  platforms: ('amazon' | 'flipkart')[]
): Promise<KeywordResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const results: KeywordResult[] = [];

  for (const platform of platforms) {
    // Generate mock keyword suggestions
    const keywords: KeywordData[] = [];
    const suggestions = generateKeywordSuggestions(seedKeyword, platform);
    
    for (const suggestion of suggestions) {
      keywords.push({
        keyword: suggestion,
        volume: Math.floor(Math.random() * 10000) + 100,
        competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        cpc: Math.round((Math.random() * 5 + 0.1) * 100) / 100,
      });
    }

    // Create formatted string
    const formattedString = keywords.map(k => k.keyword).join(', ');

    results.push({
      platform,
      keywords: keywords.slice(0, 10), // Top 10
      formattedString,
    });
  }

  return results;
};

const generateKeywordSuggestions = (seed: string, platform: 'amazon' | 'flipkart'): string[] => {
  const baseModifiers = [
    'best',
    'cheap',
    'buy online',
    'price',
    'review',
    'discount',
    'offer',
    'sale',
    'deals',
    'latest'
  ];

  const platformModifiers = platform === 'amazon' 
    ? ['amazon', 'prime', 'delivery', 'rating']
    : ['flipkart', 'myntra', 'big billion', 'plus'];

  const allModifiers = [...baseModifiers, ...platformModifiers];
  
  const suggestions = [
    seed,
    ...allModifiers.slice(0, 8).map(mod => `${mod} ${seed}`),
    `${seed} online`,
  ];

  return suggestions.slice(0, 10);
};

export const exportKeywordsToCSV = (results: KeywordResult[]): string => {
  let csv = 'Platform,Keyword,Volume,Competition,CPC\n';
  
  results.forEach(result => {
    result.keywords.forEach(keyword => {
      csv += `${result.platform},${keyword.keyword},${keyword.volume},${keyword.competition},${keyword.cpc || 'N/A'}\n`;
    });
  });
  
  return csv;
};
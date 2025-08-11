'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Download, 
  Copy, 
  ArrowLeft, 
  TrendingUp, 
  Target,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface KeywordData {
  keyword: string;
  volume: number;
  competition: string;
  cpc?: number;
}

interface KeywordResult {
  platform: 'amazon' | 'flipkart';
  keywords: KeywordData[];
  formattedString: string;
}

export default function KeywordResearchPage() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [platforms, setPlatforms] = useState<('amazon' | 'flipkart')[]>(['amazon']);
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlatformChange = (platform: 'amazon' | 'flipkart', checked: boolean) => {
    if (checked) {
      setPlatforms([...platforms, platform]);
    } else {
      setPlatforms(platforms.filter(p => p !== platform));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedKeyword.trim() || platforms.length === 0) {
      setError('Please enter a keyword and select at least one platform');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/tools/keyword-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seedKeyword: seedKeyword.trim(),
          platforms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to fetch keyword data');
        return;
      }

      setResults(data.results);
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const exportToCSV = () => {
    let csv = 'Platform,Keyword,Volume,Competition,CPC\n';
    
    results.forEach(result => {
      result.keywords.forEach(keyword => {
        csv += `${result.platform},${keyword.keyword},${keyword.volume},${keyword.competition},${keyword.cpc || 'N/A'}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${seedKeyword}-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <div className="text-2xl font-bold text-indigo-600">Keyword Research</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Research Keywords
                </CardTitle>
                <CardDescription>
                  Enter a seed keyword to discover related terms and their metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="keyword">Seed Keyword</Label>
                    <Input
                      id="keyword"
                      value={seedKeyword}
                      onChange={(e) => setSeedKeyword(e.target.value)}
                      placeholder="e.g., wireless headphones"
                      required
                    />
                  </div>

                  <div>
                    <Label>Platforms</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amazon"
                          checked={platforms.includes('amazon')}
                          onCheckedChange={(checked) => handlePlatformChange('amazon', !!checked)}
                        />
                        <Label htmlFor="amazon" className="flex items-center">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" 
                            alt="Amazon" 
                            className="w-6 h-6 mr-2"
                          />
                          Amazon
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="flipkart"
                          checked={platforms.includes('flipkart')}
                          onCheckedChange={(checked) => handlePlatformChange('flipkart', !!checked)}
                        />
                        <Label htmlFor="flipkart" className="flex items-center">
                          <img 
                            src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" 
                            alt="Flipkart" 
                            className="w-6 h-6 mr-2 object-contain"
                          />
                          Flipkart
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Researching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Research Keywords
                      </>
                    )}
                  </Button>
                </form>

                {results.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <Button onClick={exportToCSV} variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export to CSV
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center capitalize">
                          <img 
                            src={result.platform === 'amazon' 
                              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png"
                              : "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png"
                            }
                            alt={result.platform}
                            className="w-8 h-8 mr-3 object-contain"
                          />
                          {result.platform} Keywords
                        </CardTitle>
                        <Badge variant="secondary">
                          {result.keywords.length} keywords
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Formatted String */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">Backend Search Terms</Label>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(result.formattedString)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border">
                          {result.formattedString}
                        </p>
                      </div>

                      <Separator className="my-4" />

                      {/* Keywords Table */}
                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Keyword Details
                        </h4>
                        <div className="space-y-2">
                          {result.keywords.map((keyword, kIndex) => (
                            <div key={kIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                              <div className="flex-1">
                                <div className="font-medium">{keyword.keyword}</div>
                                <div className="text-sm text-gray-600 flex items-center space-x-4">
                                  <span className="flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {keyword.volume.toLocaleString()} searches/month
                                  </span>
                                  {keyword.cpc && (
                                    <span>CPC: ₹{keyword.cpc}</span>
                                  )}
                                </div>
                              </div>
                              <Badge className={getCompetitionColor(keyword.competition)}>
                                {keyword.competition}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : !loading && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enter a keyword and select platforms to start researching
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
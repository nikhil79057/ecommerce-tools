'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  FileText,
  Zap
} from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  user: {
    name: string;
    email: string;
    subscriptions: number;
    usage: number;
  };
  subscriptions: Array<{
    id: string;
    toolName: string;
    status: string;
    endDate: string;
    amount: number;
  }>;
  usage: {
    thisMonth: number;
    limit: number;
  };
  tools: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    hasAccess: boolean;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const [userRes, toolsRes] = await Promise.all([
        fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/tools', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const userData = await userRes.json();
      const toolsData = await toolsRes.json();

      setData({
        user: {
          name: userData.user?.name || 'User',
          email: userData.user?.email || '',
          subscriptions: userData.subscriptions?.length || 0,
          usage: userData.usage || 0,
        },
        subscriptions: userData.subscriptions || [],
        usage: {
          thisMonth: userData.usage || 0,
          limit: 100,
        },
        tools: toolsData.tools || [],
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Active Tools',
      value: data?.subscriptions.length || 0,
      icon: Zap,
      description: 'Subscribed tools',
      color: 'text-blue-600',
    },
    {
      title: 'Usage This Month',
      value: data?.usage.thisMonth || 0,
      icon: BarChart3,
      description: 'API calls made',
      color: 'text-green-600',
    },
    {
      title: 'Total Saved',
      value: '₹12,450',
      icon: TrendingUp,
      description: 'Revenue generated',
      color: 'text-purple-600',
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: Users,
      description: 'Keyword accuracy',
      color: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">SaaSTools</div>
              <Badge variant="secondary" className="ml-3">
                Seller Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {data?.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {data?.user.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your e-commerce tools today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Tools */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Tools</CardTitle>
                <CardDescription>
                  Subscribe to unlock powerful e-commerce tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{tool.icon}</div>
                        <div>
                          <h3 className="font-semibold">{tool.name}</h3>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {tool.hasAccess ? (
                          <>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                            <Link href={`/tools/${tool.id}`}>
                              <Button size="sm">Use Tool</Button>
                            </Link>
                          </>
                        ) : (
                          <Link href={`/tools/${tool.id}/subscribe`}>
                            <Button size="sm" variant="outline">
                              Subscribe
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>API Calls</span>
                    <span>{data?.usage.thisMonth}/{data?.usage.limit}</span>
                  </div>
                  <Progress 
                    value={(data?.usage.thisMonth || 0) / (data?.usage.limit || 1) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600">
                    {(data?.usage.limit || 0) - (data?.usage.thisMonth || 0)} calls remaining
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Keyword Research
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing History
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Keyword research completed</span>
                    <span className="text-gray-500 text-xs ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Tool subscription renewed</span>
                    <span className="text-gray-500 text-xs ml-auto">1d ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Report generated</span>
                    <span className="text-gray-500 text-xs ml-auto">3d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
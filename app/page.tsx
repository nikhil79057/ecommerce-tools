'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight, Zap, Shield, Users, BarChart } from 'lucide-react';
import Link from 'next/link';

interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  pricing: Array<{
    name: string;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
  }>;
}

export default function HomePage() {
  const [content, setContent] = useState<LandingContent>({
    hero: {
      title: "Supercharge Your E-commerce Business",
      subtitle: "Access powerful micro-tools designed specifically for Amazon & Flipkart sellers. Research keywords, analyze competition, and boost your sales with our comprehensive SaaS platform.",
      cta: "Start Your Free Trial",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    features: [
      {
        icon: "🔍",
        title: "Keyword Research & Backend Formatter",
        description: "Find high-volume, low-competition keywords for Amazon and Flipkart. Get perfectly formatted backend search terms to maximize your product visibility."
      },
      {
        icon: "📊",
        title: "Competition Analysis",
        description: "Analyze competitor products, pricing strategies, and market positioning to stay ahead of the competition."
      },
      {
        icon: "💰",
        title: "Price Optimization",
        description: "Get real-time pricing insights and recommendations to maximize your profit margins while staying competitive."
      },
      {
        icon: "📈",
        title: "Sales Analytics",
        description: "Track your performance across platforms with comprehensive analytics and actionable insights."
      }
    ],
    pricing: [
      {
        name: "Starter",
        price: 5,
        description: "Perfect for individual sellers",
        features: [
          "1 Tool Access",
          "100 Keyword Searches/month",
          "Basic Analytics",
          "Email Support"
        ]
      },
      {
        name: "Professional",
        price: 15,
        description: "For growing businesses",
        features: [
          "3 Tools Access",
          "500 Keyword Searches/month",
          "Advanced Analytics",
          "Priority Support",
          "CSV Export"
        ],
        popular: true
      },
      {
        name: "Enterprise",
        price: 50,
        description: "For established sellers",
        features: [
          "All Tools Access",
          "Unlimited Searches",
          "Custom Analytics",
          "24/7 Support",
          "API Access",
          "White-label Options"
        ]
      }
    ]
  });

  const stats = [
    { label: "Active Sellers", value: "10,000+", icon: Users },
    { label: "Keywords Analyzed", value: "1M+", icon: BarChart },
    { label: "Revenue Generated", value: "₹50Cr+", icon: Zap },
    { label: "Success Rate", value: "95%", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">SaaSTools</div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
              <Link href="/auth/login" className="text-gray-600 hover:text-indigo-600 transition">Login</Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                🚀 Trusted by 10,000+ Sellers
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="group">
                    {content.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={content.hero.image}
                alt="SaaS Dashboard"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for E-commerce Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to research, optimize, and grow your Amazon & Flipkart business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {content.features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="group-hover:text-indigo-600 transition">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business. All plans include core features.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {content.pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-indigo-500 border-2 scale-105' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/register">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Scale Your E-commerce Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful sellers who trust our platform to grow their Amazon & Flipkart stores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">SaaSTools</div>
              <p className="text-gray-400 mb-4">
                Empowering e-commerce sellers with powerful analytics and optimization tools.
              </p>
              <div className="flex space-x-4">
                <div className="text-2xl">🐦</div>
                <div className="text-2xl">💼</div>
                <div className="text-2xl">📧</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SaaSTools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
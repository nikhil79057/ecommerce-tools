import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get current month statistics
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [
      totalUsers,
      activeSubscriptions,
      monthlyRevenue,
      toolUsage,
      userGrowth,
      subscriptionGrowth
    ] = await Promise.all([
      // Total users
      prisma.user.count({ where: { role: 'seller' } }),
      
      // Active subscriptions
      prisma.subscription.count({ 
        where: { 
          status: 'active',
          endDate: { gt: now }
        } 
      }),
      
      // Monthly revenue
      prisma.subscription.aggregate({
        where: {
          status: 'active',
          startDate: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: { amount: true },
      }),
      
      // Tool usage stats
      prisma.usage.groupBy({
        by: ['toolId'],
        _count: { _all: true },
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
      }),
      
      // User growth (last 6 months)
      prisma.user.groupBy({
        by: ['createdAt'],
        _count: { _all: true },
        where: {
          role: 'seller',
          createdAt: {
            gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
          },
        },
      }),
      
      // Subscription growth
      prisma.subscription.groupBy({
        by: ['createdAt'],
        _count: { _all: true },
        where: {
          createdAt: {
            gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
          },
        },
      }),
    ]);

    // Get tool names for usage stats
    const toolIds = toolUsage.map(t => t.toolId);
    const tools = await prisma.tool.findMany({
      where: { id: { in: toolIds } },
      select: { id: true, name: true },
    });

    const toolUsageWithNames = toolUsage.map(usage => ({
      ...usage,
      toolName: tools.find(t => t.id === usage.toolId)?.name || 'Unknown',
    }));

    return NextResponse.json({
      overview: {
        totalUsers,
        activeSubscriptions,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        totalRevenue: 0, // Calculate separately if needed
      },
      toolUsage: toolUsageWithNames,
      userGrowth,
      subscriptionGrowth,
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
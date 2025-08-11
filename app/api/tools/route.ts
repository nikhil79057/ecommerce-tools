import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    const tools = await prisma.tool.findMany({
      where: { isActive: true },
      include: {
        subscriptions: user ? {
          where: { userId: user.id, status: 'active' },
        } : false,
      },
    });

    const toolsWithAccess = tools.map(tool => ({
      ...tool,
      hasAccess: user ? tool.subscriptions.length > 0 : false,
      subscriptions: undefined, // Remove from response
    }));

    return NextResponse.json({ tools: toolsWithAccess });
  } catch (error) {
    console.error('Tools fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { name, description, icon, price } = await request.json();

    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        description,
        icon: icon || '🛠️',
        price: parseFloat(price),
      },
    });

    return NextResponse.json({ tool });
  } catch (error) {
    console.error('Tool creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    );
  }
}
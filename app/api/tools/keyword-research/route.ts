import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { fetchKeywordData, exportKeywordsToCSV } from '@/lib/keyword-api';

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to keyword research tool
    const keywordTool = await prisma.tool.findFirst({
      where: { name: 'Keyword Research & Backend Formatter' },
    });

    if (!keywordTool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        toolId: keywordTool.id,
        status: 'active',
        endDate: { gt: new Date() },
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription required for this tool' },
        { status: 403 }
      );
    }

    const { seedKeyword, platforms } = await request.json();

    if (!seedKeyword || !platforms || !Array.isArray(platforms)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Fetch keyword data
    const results = await fetchKeywordData(seedKeyword, platforms);

    // Log usage
    await prisma.usage.create({
      data: {
        userId: user.id,
        toolId: keywordTool.id,
        metadata: JSON.stringify({ seedKeyword, platforms }),
      },
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Keyword research error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keyword data' },
      { status: 500 }
    );
  }
}
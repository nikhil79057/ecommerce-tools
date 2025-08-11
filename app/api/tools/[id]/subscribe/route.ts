import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { createOrder } from '@/lib/razorpay';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const toolId = params.id;
    const tool = await prisma.tool.findUnique({
      where: { id: toolId },
    });

    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Check if already subscribed
    const existingSub = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        toolId: tool.id,
        status: 'active',
      },
    });

    if (existingSub) {
      return NextResponse.json(
        { error: 'Already subscribed to this tool' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const amount = tool.price * 12; // Annual billing
    const order = await createOrder(
      amount,
      'INR',
      `tool_${tool.id}_${user.id}`
    );

    // Create subscription record
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        toolId: tool.id,
        amount,
        endDate,
        status: 'pending',
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      subscription: subscription.id,
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
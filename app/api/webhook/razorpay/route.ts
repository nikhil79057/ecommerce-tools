import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { prisma } from '@/lib/database';
import { sendTemplateEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const { event, payload } = body;

    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload);
        break;
      case 'subscription.charged':
        await handleSubscriptionCharged(payload);
        break;
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(payload);
        break;
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payload: any) {
  const { payment } = payload;
  
  // Update subscription status
  const subscription = await prisma.subscription.findFirst({
    where: {
      razorpaySubId: payment.subscription_id,
    },
    include: { user: true, tool: true },
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'active' },
    });

    // Send confirmation email
    await sendTemplateEmail(
      subscription.user.email,
      'subscription_confirmed',
      {
        name: subscription.user.name,
        toolName: subscription.tool.name,
        amount: subscription.amount.toString(),
      }
    );
  }
}

async function handleSubscriptionCharged(payload: any) {
  // Create invoice record
  // Send invoice email
}

async function handleSubscriptionCancelled(payload: any) {
  const { subscription } = payload;
  
  await prisma.subscription.updateMany({
    where: { razorpaySubId: subscription.id },
    data: { status: 'cancelled' },
  });
}
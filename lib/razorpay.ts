import Razorpay from 'razorpay';

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createSubscription = async (planId: string, totalCount: number, customerNotify: boolean = true) => {
  return await razorpay.subscriptions.create({
    plan_id: planId,
    customer_notify: customerNotify ? 1 : 0,
    total_count: totalCount,
  });
};

export const createOrder = async (amount: number, currency: string = 'INR', receipt: string) => {
  return await razorpay.orders.create({
    amount: amount * 100, // Razorpay expects amount in paise
    currency,
    receipt,
  });
};

export const verifyPaymentSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): boolean => {
  const crypto = require('crypto');
  
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
    
  return generatedSignature === razorpaySignature;
};
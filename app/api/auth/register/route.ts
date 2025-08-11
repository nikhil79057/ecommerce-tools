import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateVerificationToken } from '@/lib/auth';
import { prisma } from '@/lib/database';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const verificationToken = generateVerificationToken();

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        role: email === process.env.ADMIN_EMAIL ? 'admin' : 'seller',
      },
    });

    // Send welcome email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}`;
    await sendWelcomeEmail(email, name, verificationUrl);

    return NextResponse.json({
      message: 'Registration successful. Please check your email for verification.',
      userId: user.id,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
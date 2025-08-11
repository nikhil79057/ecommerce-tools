const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@saastools.com' },
    update: {},
    create: {
      email: 'admin@saastools.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
      isVerified: true,
    },
  });

  // Create demo seller
  const sellerPassword = await bcrypt.hash('seller123', 12);
  const seller = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      email: 'seller@example.com',
      password: sellerPassword,
      name: 'Demo Seller',
      role: 'seller',
      isVerified: true,
    },
  });

  // Create tools
  const keywordTool = await prisma.tool.upsert({
    where: { id: 'keyword-research' },
    update: {},
    create: {
      id: 'keyword-research',
      name: 'Keyword Research & Backend Formatter',
      description: 'Find high-volume, low-competition keywords for Amazon and Flipkart. Get perfectly formatted backend search terms.',
      icon: '🔍',
      price: 60, // ₹5/month * 12 months
      isActive: true,
    },
  });

  const competitionTool = await prisma.tool.upsert({
    where: { id: 'competition-analysis' },
    update: {},
    create: {
      id: 'competition-analysis',
      name: 'Competition Analysis',
      description: 'Analyze competitor products, pricing strategies, and market positioning.',
      icon: '📊',
      price: 180, // ₹15/month * 12 months
      isActive: true,
    },
  });

  const priceTool = await prisma.tool.upsert({
    where: { id: 'price-optimization' },
    update: {},
    create: {
      id: 'price-optimization',
      name: 'Price Optimization',
      description: 'Get real-time pricing insights and recommendations to maximize profit margins.',
      icon: '💰',
      price: 600, // ₹50/month * 12 months
      isActive: true,
    },
  });

  // Create email templates
  await prisma.emailTemplate.upsert({
    where: { name: 'welcome' },
    update: {},
    create: {
      name: 'welcome',
      subject: 'Welcome to SaaSTools - Verify Your Account',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to SaaSTools, {{name}}!</h2>
          <p>Thank you for joining our platform. We're excited to help you grow your e-commerce business.</p>
          <p>To get started, please verify your email address by clicking the button below:</p>
          <a href="{{verificationUrl}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email Address
          </a>
          <p>Once verified, you'll have access to our powerful suite of e-commerce tools.</p>
          <p>Best regards,<br>The SaaSTools Team</p>
        </div>
      `,
      textContent: 'Welcome to SaaSTools! Please verify your email at: {{verificationUrl}}',
      isActive: true,
    },
  });

  await prisma.emailTemplate.upsert({
    where: { name: 'password_reset' },
    update: {},
    create: {
      name: 'password_reset',
      subject: 'Reset Your SaaSTools Password',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Reset Your Password</h2>
          <p>Hi {{name}},</p>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <a href="{{resetUrl}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The SaaSTools Team</p>
        </div>
      `,
      textContent: 'Reset your password at: {{resetUrl}}',
      isActive: true,
    },
  });

  await prisma.emailTemplate.upsert({
    where: { name: 'subscription_confirmed' },
    update: {},
    create: {
      name: 'subscription_confirmed',
      subject: 'Subscription Confirmed - {{toolName}}',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10B981;">Subscription Confirmed!</h2>
          <p>Hi {{name}},</p>
          <p>Your subscription to <strong>{{toolName}}</strong> has been confirmed!</p>
          <p><strong>Amount:</strong> ₹{{amount}}</p>
          <p>You now have full access to this powerful tool. Start maximizing your e-commerce potential today!</p>
          <a href="{{appUrl}}/dashboard" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Access Your Tools
          </a>
          <p>Best regards,<br>The SaaSTools Team</p>
        </div>
      `,
      textContent: 'Your subscription to {{toolName}} is confirmed! Amount: ₹{{amount}}',
      isActive: true,
    },
  });

  // Create landing page content
  await prisma.landingPageContent.upsert({
    where: { section: 'hero' },
    update: {},
    create: {
      section: 'hero',
      content: JSON.stringify({
        title: 'Supercharge Your E-commerce Business',
        subtitle: 'Access powerful micro-tools designed specifically for Amazon & Flipkart sellers. Research keywords, analyze competition, and boost your sales with our comprehensive SaaS platform.',
        cta: 'Start Your Free Trial',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
      }),
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin user: admin@saastools.com / admin123');
  console.log('Demo seller: seller@example.com / seller123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
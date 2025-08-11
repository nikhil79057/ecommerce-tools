const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  try {
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
    console.log('✅ Admin user created');

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
    console.log('✅ Demo seller created');

    // Create tools
    const tools = [
      {
        id: 'keyword-research',
        name: 'Keyword Research & Backend Formatter',
        description: 'Find high-volume, low-competition keywords for Amazon and Flipkart. Get perfectly formatted backend search terms.',
        icon: '🔍',
        price: 60.00, // ₹5/month * 12 months
        features: JSON.stringify([
          'Unlimited keyword searches',
          'Amazon & Flipkart support',
          'Backend search term formatting',
          'Competition analysis',
          'CSV export'
        ])
      },
      {
        id: 'competition-analysis',
        name: 'Competition Analysis',
        description: 'Analyze competitor products, pricing strategies, and market positioning.',
        icon: '📊',
        price: 180.00, // ₹15/month * 12 months
        features: JSON.stringify([
          'Competitor product analysis',
          'Pricing strategy insights',
          'Market positioning data',
          'Performance metrics',
          'Trend analysis'
        ])
      },
      {
        id: 'price-optimization',
        name: 'Price Optimization',
        description: 'Get real-time pricing insights and recommendations to maximize profit margins.',
        icon: '💰',
        price: 600.00, // ₹50/month * 12 months
        features: JSON.stringify([
          'Real-time price monitoring',
          'Profit margin optimization',
          'Dynamic pricing suggestions',
          'Market trend analysis',
          'Automated alerts'
        ])
      },
      {
        id: 'sales-analytics',
        name: 'Sales Analytics Dashboard',
        description: 'Comprehensive analytics and reporting for your e-commerce performance.',
        icon: '📈',
        price: 240.00, // ₹20/month * 12 months
        features: JSON.stringify([
          'Sales performance tracking',
          'Revenue analytics',
          'Customer insights',
          'Inventory management',
          'Custom reports'
        ])
      }
    ];

    for (const tool of tools) {
      await prisma.tool.upsert({
        where: { id: tool.id },
        update: {},
        create: tool,
      });
    }
    console.log('✅ Tools created');

    // Create email templates
    const emailTemplates = [
      {
        name: 'welcome',
        subject: 'Welcome to SaaSTools - Verify Your Account',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; margin: 0;">SaaSTools</h1>
            </div>
            <h2 style="color: #4F46E5;">Welcome, {{name}}!</h2>
            <p>Thank you for joining our platform. We're excited to help you grow your e-commerce business.</p>
            <p>To get started, please verify your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{verificationUrl}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p>Once verified, you'll have access to our powerful suite of e-commerce tools.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              The SaaSTools Team
            </p>
          </div>
        `,
        textContent: 'Welcome to SaaSTools! Please verify your email at: {{verificationUrl}}',
      },
      {
        name: 'password_reset',
        subject: 'Reset Your SaaSTools Password',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; margin: 0;">SaaSTools</h1>
            </div>
            <h2 style="color: #4F46E5;">Reset Your Password</h2>
            <p>Hi {{name}},</p>
            <p>You requested to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{resetUrl}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              The SaaSTools Team
            </p>
          </div>
        `,
        textContent: 'Reset your password at: {{resetUrl}}',
      },
      {
        name: 'subscription_confirmed',
        subject: 'Subscription Confirmed - {{toolName}}',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #4F46E5; margin: 0;">SaaSTools</h1>
            </div>
            <h2 style="color: #10B981;">Subscription Confirmed!</h2>
            <p>Hi {{name}},</p>
            <p>Your subscription to <strong>{{toolName}}</strong> has been confirmed!</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Tool:</strong> {{toolName}}</p>
              <p style="margin: 10px 0 0 0;"><strong>Amount:</strong> ₹{{amount}}</p>
            </div>
            <p>You now have full access to this powerful tool. Start maximizing your e-commerce potential today!</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{appUrl}}/dashboard" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Access Your Tools
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              The SaaSTools Team
            </p>
          </div>
        `,
        textContent: 'Your subscription to {{toolName}} is confirmed! Amount: ₹{{amount}}',
      }
    ];

    for (const template of emailTemplates) {
      await prisma.emailTemplate.upsert({
        where: { name: template.name },
        update: {},
        create: template,
      });
    }
    console.log('✅ Email templates created');

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
    console.log('✅ Landing page content created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('👨‍💼 Admin: admin@saastools.com / admin123');
    console.log('🛒 Demo Seller: seller@example.com / seller123');
    console.log('\n🔧 Next Steps:');
    console.log('1. Update your .env file with proper database credentials');
    console.log('2. Configure SMTP settings for email functionality');
    console.log('3. Set up Razorpay keys for payment processing');
    console.log('4. Start the backend server: npm run dev');
    console.log('5. Start the frontend server: npm run dev (in frontend folder)');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
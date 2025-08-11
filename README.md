# SaaS Tools Platform

A comprehensive multi-tenant SaaS platform for e-commerce sellers, providing powerful tools for Amazon and Flipkart marketplace optimization.

## 🚀 Features

### Public Landing Page
- **CMS-Editable Content**: Hero sections, features, pricing tables
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Meta tags, structured data, fast loading

### Seller Portal
- **Authentication**: JWT-based auth with email verification
- **Tool Subscription**: Razorpay integration for payments
- **Keyword Research Tool**: Amazon/Flipkart keyword analysis
- **Usage Tracking**: Monitor API calls and tool usage
- **Billing Management**: View invoices, manage subscriptions

### Admin Portal
- **User Management**: Search, filter, manage all users
- **Tool Management**: Create, edit, disable tools dynamically
- **Analytics Dashboard**: Revenue, usage, conversion metrics
- **Manual Invoicing**: Generate custom invoices with PDFs
- **Email Automation**: Template management and campaigns
- **Landing Page CMS**: WYSIWYG editor for content updates

### Technical Features
- **Multi-tenant Architecture**: Secure data isolation
- **Subscription Billing**: Automated recurring payments
- **Email System**: Transactional and marketing emails
- **PDF Generation**: Automated invoice creation
- **Webhook Handling**: Razorpay payment notifications
- **Rate Limiting**: API protection and fair usage
- **Security**: Input validation, CORS, helmet.js

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Payments**: Razorpay subscriptions and one-off payments
- **Email**: Nodemailer with template system
- **PDF**: PDFKit for invoice generation
- **Deployment**: Docker, Kubernetes, GitHub Actions

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Seller dashboard
│   ├── admin/             # Admin portal
│   └── tools/             # Individual tool pages
├── components/            # Reusable UI components
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── database.ts       # Prisma client
│   ├── email.ts          # Email services
│   ├── pdf.ts            # PDF generation
│   └── razorpay.ts       # Payment processing
├── prisma/               # Database schema and migrations
├── k8s/                  # Kubernetes manifests
├── scripts/              # Database seeding and utilities
└── public/               # Static assets
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone and Install
```bash
git clone <repository-url>
cd saas-tools-platform
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# - Database URL
# - JWT secrets
# - Razorpay credentials
# - SMTP settings
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with initial data
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 5. Default Accounts
- **Admin**: admin@saastools.com / admin123
- **Demo Seller**: seller@example.com / seller123

## 🐳 Docker Deployment

### Development
```bash
# Start with Docker Compose
docker-compose up -d
```

### Production Build
```bash
# Build image
docker build -t saas-tools .

# Run container
docker run -p 3000:3000 --env-file .env saas-tools
```

## ☸️ Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n saas-tools
```

## 📊 Database Schema

The application uses Prisma with SQLite for data management:

- **Users**: Authentication and profile data
- **Tools**: Available micro-tools and pricing
- **Subscriptions**: User tool subscriptions
- **Invoices**: Billing and payment records
- **Usage**: Tool usage tracking
- **Landing Content**: CMS-managed page content
- **Email Templates**: Automated email content

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Configure allowed origins
- **SQL Injection Prevention**: Prisma ORM queries
- **XSS Protection**: React's built-in sanitization

## 💳 Payment Integration

### Razorpay Setup
1. Create Razorpay account
2. Get API keys from dashboard
3. Configure webhook endpoints
4. Test with Razorpay's test cards

### Supported Features
- Annual subscriptions (₹5/tool/month billed yearly)
- Manual one-off invoices
- Webhook handling for payment status
- Automated subscription renewal
- Failed payment retry logic

## 📧 Email System

### Templates
- Welcome email with verification
- Password reset
- Subscription confirmation
- Payment receipts
- Usage reminders

### SMTP Configuration
Supports major email providers:
- Gmail (recommended for development)
- SendGrid (recommended for production)
- Amazon SES
- Custom SMTP servers

## 🛡️ API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Email verification
- `POST /api/auth/refresh` - Token refresh

### Tool Endpoints
- `GET /api/tools` - List available tools
- `POST /api/tools/{id}/subscribe` - Subscribe to tool
- `POST /api/tools/keyword-research` - Keyword research

### Admin Endpoints
- `GET /api/admin/users` - User management
- `GET /api/admin/analytics` - Platform analytics
- `POST /api/admin/invoices` - Generate invoices

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test auth

# Run with coverage
npm test -- --coverage
```

## 📈 Monitoring & Analytics

### Key Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Churn Rate
- Tool Usage Statistics
- API Response Times

### Dashboard Features
- Real-time user activity
- Revenue tracking
- Tool popularity metrics
- User engagement scores

## 🚀 Deployment Strategies

### Staging Environment
- Automated deployment on `develop` branch
- Integration testing
- Manual QA validation

### Production Environment
- Blue-green deployment
- Health checks
- Rollback capabilities
- Zero-downtime updates

## 🔧 Configuration

### Environment Variables
```bash
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Payments
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL="admin@yourdomain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@saastools.com
- Documentation: /docs
- Community: Discord server

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core authentication system
- ✅ Basic tool subscription
- ✅ Keyword research tool
- ✅ Admin portal foundation

### Phase 2 (Next)
- 📍 Additional e-commerce tools
- 📍 Advanced analytics dashboard
- 📍 Mobile app development
- 📍 API marketplace integration

### Phase 3 (Future)
- 📍 AI-powered insights
- 📍 Multi-language support
- 📍 Enterprise features
- 📍 White-label solutions

---

Built with ❤️ for e-commerce entrepreneurs worldwide.
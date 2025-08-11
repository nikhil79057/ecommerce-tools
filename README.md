# SaaS Tools Platform - Separated Backend & Frontend

A comprehensive multi-tenant SaaS platform for e-commerce sellers with separated backend (Express.js) and frontend (Next.js) architecture.

## 🏗️ Architecture

### Backend (Port 5000)
- **Framework**: Express.js with Node.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **Features**: REST API, file uploads, PDF generation, email system

### Frontend (Port 3000)
- **Framework**: Next.js with React
- **UI**: Tailwind CSS + shadcn/ui components
- **State Management**: React hooks + localStorage
- **Features**: Responsive design, real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL database (Hostinger or local)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
# Database (Replace with your Hostinger MySQL credentials)
DATABASE_URL="mysql://username:password@hostname:3306/database_name"

# Server
PORT=5000
NODE_ENV=development

# JWT Secrets (Generate strong secrets)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-complex"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here-make-it-different"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# URLs
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:5000"
ADMIN_EMAIL="admin@yourdomain.com"
```

Setup database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
```

Start frontend:
```bash
npm run dev
```

## 🗄️ Database Configuration for Hostinger MySQL

### 1. Get Database Credentials
From your Hostinger panel, note:
- **Host**: Usually `localhost` or specific hostname
- **Database Name**: Your database name
- **Username**: Database username
- **Password**: Database password
- **Port**: Usually `3306`

### 2. Update DATABASE_URL
```env
DATABASE_URL="mysql://username:password@hostname:3306/database_name"
```

Example:
```env
DATABASE_URL="mysql://u123456789_saastools:MyPassword123@localhost:3306/u123456789_saastools"
```

### 3. Database Schema
The Prisma schema includes all necessary tables:
- `users` - User accounts and authentication
- `tools` - Available micro-tools
- `subscriptions` - User tool subscriptions
- `invoices` - Billing and payments
- `usage` - Tool usage tracking
- `landing_content` - CMS content
- `email_templates` - Email automation
- `api_keys` - API access management
- `audit_logs` - System audit trail

### 4. Migration Commands
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for development)
npx prisma db push

# Create and run migrations (for production)
npx prisma migrate dev --name init

# View database in browser
npx prisma studio
```

## 🔧 Key Features

### Authentication System
- JWT-based authentication with refresh tokens
- Email verification
- Password reset functionality
- Role-based access control (admin/seller)

### Payment Integration
- Razorpay subscription management
- Automated billing cycles
- Invoice generation with PDF
- Webhook handling for payment events

### Tool System
- Modular micro-tool architecture
- Usage tracking and limits
- Subscription-based access control
- API rate limiting

### Admin Portal
- User management
- Tool management
- Analytics dashboard
- Manual invoicing
- Email template management
- CMS for landing page

### Email System
- Template-based emails
- SMTP configuration
- Automated notifications
- Welcome, verification, and billing emails

## 📁 Project Structure

```
├── backend/                 # Express.js API server
│   ├── routes/             # API route handlers
│   ├── lib/                # Utility libraries
│   ├── prisma/             # Database schema
│   ├── scripts/            # Database seeding
│   └── server.js           # Main server file
├── frontend/               # Next.js frontend
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/                # Frontend utilities
│   └── public/             # Static assets
└── README.md
```

## 🔐 Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention (Prisma)
- XSS protection
- JWT token expiration
- Password hashing with bcrypt

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set secure JWT secrets
4. Configure SMTP for production
5. Deploy to your preferred platform (Railway, Heroku, DigitalOcean)

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform

## 📊 Default Accounts

After seeding:
- **Admin**: admin@saastools.com / admin123
- **Demo Seller**: seller@example.com / seller123

## 🛠️ Development Commands

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npx prisma studio    # Database GUI
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Environment Variables

### Backend Required
- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Access token secret
- `JWT_REFRESH_SECRET` - Refresh token secret
- `SMTP_*` - Email configuration
- `RAZORPAY_*` - Payment gateway keys

### Frontend Required
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay public key

## 📞 Support

For issues and questions:
1. Check the logs in both backend and frontend
2. Verify database connection
3. Ensure all environment variables are set
4. Check API endpoints are accessible

## 🎯 Next Steps

1. Configure your Hostinger MySQL database
2. Set up email SMTP (Gmail, SendGrid, etc.)
3. Configure Razorpay for payments
4. Customize the landing page content
5. Add your own micro-tools
6. Deploy to production

---

Built with ❤️ for e-commerce entrepreneurs worldwide.
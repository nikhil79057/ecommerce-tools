import nodemailer from 'nodemailer';
import { prisma } from './database';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string,
  attachments?: any[]
) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
      text,
      attachments,
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

export const sendTemplateEmail = async (
  to: string,
  templateName: string,
  variables: Record<string, string> = {}
) => {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { name: templateName, isActive: true },
    });

    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    let subject = template.subject;
    let html = template.htmlContent;
    let text = template.textContent || '';

    // Replace variables in template
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), value);
      html = html.replace(new RegExp(placeholder, 'g'), value);
      text = text.replace(new RegExp(placeholder, 'g'), value);
    });

    return await sendEmail(to, subject, html, text);
  } catch (error) {
    console.error('Template email error:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (to: string, name: string, verificationUrl: string) => {
  return await sendTemplateEmail(to, 'welcome', {
    name,
    verificationUrl,
    appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  });
};

export const sendPasswordResetEmail = async (to: string, name: string, resetUrl: string) => {
  return await sendTemplateEmail(to, 'password_reset', {
    name,
    resetUrl,
    appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  });
};
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { prisma } from './db.js';

// Create a test account if no email configuration is provided
const createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };
};

// Create transporter with configuration
const createTransporter = async () => {
  // For development, use ethereal email if no SMTP configuration is provided
  const config = process.env.SMTP_HOST
    ? {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : await createTestAccount();

  return nodemailer.createTransport(config);
};

// Generate verification token
const generateToken = () => crypto.randomBytes(32).toString('hex');

// Create verification token for user
export const createVerificationToken = async (userId) => {
  // Delete any existing tokens for this user
  await prisma.verificationToken.deleteMany({
    where: { userId },
  });

  // Create new token
  const token = generateToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      userId,
      expires,
    },
  });

  return verificationToken;
};

// Send verification email
export const sendVerificationEmail = async (user, token) => {
  const transporter = await createTransporter();
  const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || '"Hebrew Learn" <noreply@hebrewlearn.com>',
    to: user.email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to Hebrew Learn!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  // For development: Log ethereal URL to view email
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

  return info;
};

// Verify email with token
export const verifyEmail = async (token) => {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!verificationToken) {
    throw new Error('Invalid verification token');
  }

  if (verificationToken.expires < new Date()) {
    throw new Error('Verification token has expired');
  }

  // Update user and delete token
  await prisma.$transaction([
    prisma.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: true },
    }),
    prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    }),
  ]);

  return verificationToken.user;
};

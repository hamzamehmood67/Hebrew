import express from 'express';
import { prisma } from '../utils/db.js';
import { createVerificationToken, sendVerificationEmail, verifyEmail } from '../utils/emailService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Verify email with token
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const user = await verifyEmail(token);
    res.json({ message: 'Email verified successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Resend verification email
router.post('/resend', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    const verificationToken = await createVerificationToken(user.id);
    await sendVerificationEmail(user, verificationToken.token);

    res.json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Check verification status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { emailVerified: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ verified: user.emailVerified });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check verification status' });
  }
});

export default router;

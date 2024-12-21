import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const { verifyEmail, resendVerification, user, checkVerificationStatus } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token)
        .then(() => {
          setStatus('success');
          setMessage('Email verified successfully!');
          setTimeout(() => navigate('/dashboard'), 2000);
        })
        .catch((error) => {
          setStatus('error');
          setMessage(error.message || 'Failed to verify email');
        });
    }
  }, [searchParams, verifyEmail, navigate]);

  // Periodically check verification status
  useEffect(() => {
    if (!user?.emailVerified) {
      const interval = setInterval(() => {
        checkVerificationStatus();
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [user?.emailVerified, checkVerificationStatus]);

  const handleResend = async () => {
    try {
      await resendVerification();
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to resend verification email. Please try again.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          
          <h1 className="text-2xl font-semibold tracking-tight">
            Email Verification
          </h1>

          {status === 'verifying' && (
            <p className="text-muted-foreground">
              Verifying your email address...
            </p>
          )}

          {status === 'success' && (
            <p className="text-green-600 dark:text-green-400">
              {message}
            </p>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <p className="text-red-600 dark:text-red-400">
                {message}
              </p>
              <Button
                variant="outline"
                onClick={handleResend}
                className="w-full"
              >
                Resend Verification Email
              </Button>
            </div>
          )}

          {!searchParams.get('token') && !user.emailVerified && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Please verify your email address to access all features.
              </p>
              <Button
                variant="outline"
                onClick={handleResend}
                className="w-full"
              >
                Send Verification Email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

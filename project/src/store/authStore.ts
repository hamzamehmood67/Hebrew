import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { api } from '../services/api';
import type { 
  AuthState, 
  LoginCredentials, 
  RegisterCredentials, 
  AuthError,
  User
} from '../types/auth';

/**
 * Authentication store interface extending the base auth state
 * @interface AuthStore
 */
interface AuthStore extends AuthState {
  /** Login with email and password */
  login: (credentials: LoginCredentials) => Promise<void>;
  /** Register a new user */
  register: (credentials: RegisterCredentials) => Promise<void>;
  /** Logout the current user */
  logout: () => void;
  /** Clear any auth errors */
  clearError: () => void;
  /** Set the loading state */
  setLoading: (isLoading: boolean) => void;
  /** Check if the current session is valid */
  checkSession: () => Promise<void>;
  /** Update the last activity timestamp */
  updateLastActivity: () => void;
  /** Verify email with token */
  verifyEmail: (token: string) => Promise<void>;
  /** Resend verification email */
  resendVerification: () => Promise<boolean>;
  /** Check email verification status */
  checkVerificationStatus: () => Promise<void>;
}

/**
 * Handle authentication errors
 * @param error unknown error
 * @returns AuthError
 */
const handleAuthError = (error: unknown): AuthError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'AUTH_ERROR'
    };
  }
  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR'
  };
};

/**
 * Initial authentication state
 * @constant
 */
const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
  isLoading: false,
  isAuthenticated: false
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setLoading: (isLoading) => set({ isLoading }),
      
      clearError: () => set({ error: null }),

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(credentials.email, credentials.password);
          if (response.success && response.data) {
            const { token, user } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
              error: null
            });
            // Store token in localStorage for API interceptor
            localStorage.setItem('token', token);
            localStorage.setItem('lastActivity', Date.now().toString());
          }
        } catch (error) {
          set({ error: handleAuthError(error) });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(
            credentials.email,
            credentials.password,
            credentials.name
          );
          if (response.success && response.data) {
            const { token, user } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
              error: null
            });
          }
        } catch (error) {
          set({ error: handleAuthError(error) });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set(initialState);
      },

      checkSession: async () => {
        try {
          const response = await api.getUserProfile();
          if (response.success && response.data) {
            set({ user: response.data, isAuthenticated: true });
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });
        }
      },

      updateLastActivity: () => {
        const now = new Date().toISOString();
        set((currentState) => ({
          user: currentState.user ? { ...currentState.user, lastActivity: now } : null
        }));
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.get<{ user: User }>(`/verification/verify/${token}`);
          if (response.success && response.data?.user) {
            set({ user: response.data.user });
          }
        } catch (error) {
          set({ error: handleAuthError(error) });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resendVerification: async () => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/verification/resend');
          return true;
        } catch (error) {
          set({ error: handleAuthError(error) });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      checkVerificationStatus: async () => {
        try {
          const response = await api.get<{ verified: boolean }>('/verification/status');
          const verified = response?.data?.verified;
          if (verified !== undefined) {
            set((currentState) => ({
              user: currentState.user ? { ...currentState.user, emailVerified: verified } : null
            }));
          }
        } catch (error) {
          console.error('Failed to check verification status:', error);
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      })
    }
  )
);
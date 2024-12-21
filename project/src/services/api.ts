import axios, { AxiosError, AxiosInstance } from 'axios';
import type { 
  PracticeResult, 
  WritingPrompt, 
  ReadingPrompt,
  ConversationMessage,
  UserProgress,
  ApiResponse,
  AuthResponse
} from '../types/api';
import type { User } from '../types/auth';

/**
 * API Service for handling all HTTP requests
 * 
 * Features:
 * - Singleton pattern for single instance
 * - Automatic token management
 * - Token refresh mechanism
 * - Error handling
 * - Type-safe responses
 */
class ApiService {
  private api: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      this.handleError.bind(this)
    );
  }

  /**
   * Get the singleton instance of ApiService
   * @returns {ApiService} The API service instance
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Expose HTTP methods
   */
  public async get<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(url);
    return response.data;
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(url);
    return response.data;
  }

  /**
   * Login with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<ApiResponse<AuthResponse>>} Response with auth token
   */
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/login', { email, password });
  }

  /**
   * Register a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's name
   * @returns {Promise<ApiResponse<AuthResponse>>} Response with auth token
   */
  async register(email: string, password: string, name: string): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/register', { email, password, name });
  }

  /**
   * Submit a practice result
   * @param {PracticeResult} result - Practice result data
   * @returns {Promise<ApiResponse<{ xp: number; level: number }>>} Response with updated XP and level
   */
  async submitPracticeResult(result: PracticeResult): Promise<ApiResponse<{ xp: number; level: number }>> {
    return this.post<{ xp: number; level: number }>('/practice/submit', result);
  }

  /**
   * Get the user's profile
   * @returns {Promise<ApiResponse<User>>} Response with user profile data
   */
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.get<User>('/auth/profile');
  }

  /**
   * Get writing prompts
   * @returns {Promise<ApiResponse<WritingPrompt[]>>} Response with writing prompts
   */
  async getWritingPrompts(): Promise<ApiResponse<WritingPrompt[]>> {
    return this.get<WritingPrompt[]>('/practice/writing/prompts');
  }

  /**
   * Get reading prompts
   * @returns {Promise<ApiResponse<ReadingPrompt[]>>} Response with reading prompts
   */
  async getReadingPrompts(): Promise<ApiResponse<ReadingPrompt[]>> {
    return this.get<ReadingPrompt[]>('/practice/reading/prompts');
  }

  /**
   * Submit a conversation message
   * @param {string} message - Conversation message
   * @returns {Promise<ApiResponse<ConversationMessage>>} Response with conversation message data
   */
  async submitConversationMessage(message: string): Promise<ApiResponse<ConversationMessage>> {
    return this.post<ConversationMessage>('/practice/conversation/message', { message });
  }

  /**
   * Get the user's progress
   * @returns {Promise<ApiResponse<UserProgress>>} Response with user progress data
   */
  async getUserProgress(): Promise<ApiResponse<UserProgress>> {
    return this.get<UserProgress>('/progress');
  }

  /**
   * Refresh the authentication token
   * @returns {Promise<ApiResponse<{ token: string }>>} Response with new token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.post<{ token: string }>('/auth/refresh');
  }

  private async handleError(error: AxiosError) {
    if (error.config && error.response?.status === 401 && !(error.config as any)._retry) {
      (error.config as any)._retry = true;
      try {
        const response = await this.refreshToken();
        if (response.success && response.data?.token) {
          localStorage.setItem('token', response.data.token);
          if (error.config.headers) {
            error.config.headers.Authorization = `Bearer ${response.data.token}`;
          }
          return this.api(error.config);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
}

// Export a singleton instance
export const api = ApiService.getInstance();

// Export type
export type { ApiResponse };

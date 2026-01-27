export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;            // Unix timestamp
  scope: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  tokens: AuthTokens | null;
  userEmail: string | null;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  phone_number?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  is_verified: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
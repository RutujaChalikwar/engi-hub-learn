
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

// Define user role type
export type UserRole = "admin" | "user";

// Extend Supabase User with our custom properties
export interface User extends SupabaseUser {
  role: UserRole;
  displayName?: string;
  photoURL?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
}

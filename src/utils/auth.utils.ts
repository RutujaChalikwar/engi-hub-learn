
import { User } from "@/types/auth.types";

/**
 * Enhances a Supabase user object with additional properties
 */
export const enhanceUserWithCustomProps = (user: any): User => {
  const enhancedUser = user as User;
  
  // For demo purposes, assume users with admin in email are admins
  enhancedUser.role = user.email?.includes("admin") ? "admin" : "user";
  
  // Set display name based on user metadata or email
  enhancedUser.displayName = (
    user.user_metadata?.full_name || 
    user.user_metadata?.name || 
    user.email?.split('@')[0] ||
    'User'
  );
  
  // Set photo URL if available from providers
  enhancedUser.photoURL = user.user_metadata?.avatar_url || user.user_metadata?.picture || undefined;
  
  return enhancedUser;
};

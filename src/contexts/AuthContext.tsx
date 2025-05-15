
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

// Define user role type
export type UserRole = "admin" | "user";

// Extend Supabase User with our custom properties
export interface User extends SupabaseUser {
  role: UserRole;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state and set up listener for auth state changes
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // Extend the User with our custom properties
          const user = session.user as User;
          
          // For demo purposes, assume users with admin in email are admins
          user.role = user.email?.includes("admin") ? "admin" : "user";
          
          // Set display name based on user metadata or email
          user.displayName = (
            user.user_metadata?.full_name || 
            user.user_metadata?.name || 
            user.email?.split('@')[0] ||
            'User'
          );
          
          // Set photo URL if available from providers
          user.photoURL = user.user_metadata?.avatar_url || user.user_metadata?.picture || undefined;
          
          setCurrentUser(user);
          setSession(session);
        } else {
          setCurrentUser(null);
          setSession(null);
        }

        // Debug logs
        console.log("Auth state changed:", event, session);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Extend the User with our custom properties
        const user = session.user as User;
        
        // For demo purposes, assume users with admin in email are admins
        user.role = user.email?.includes("admin") ? "admin" : "user";
        
        // Set display name based on user metadata or email
        user.displayName = (
          user.user_metadata?.full_name || 
          user.user_metadata?.name || 
          user.email?.split('@')[0] ||
          'User'
        );
        
        // Set photo URL if available from providers
        user.photoURL = user.user_metadata?.avatar_url || user.user_metadata?.picture || undefined;
        
        setCurrentUser(user);
        setSession(session);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }
      
      // No need to set user/session here as the onAuthStateChange listener will catch this
      
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Unable to sign in. Please check your credentials."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Google sign in error:", error.message);
      toast({
        variant: "destructive",
        title: "Google sign in failed",
        description: error.message || "Unable to sign in with Google."
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName
          }
        }
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Account created",
        description: "You have successfully signed up."
      });
      
      // No need to set user/session here as the onAuthStateChange listener will catch this
      
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "Unable to create account."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // No need to clear user/session here as the onAuthStateChange listener will catch this
    } catch (error: any) {
      console.error("Sign out error:", error.message);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: error.message || "Unable to sign out."
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link."
      });
    } catch (error: any) {
      console.error("Password reset error:", error.message);
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error.message || "Unable to send password reset email."
      });
      throw error;
    }
  };

  const isAdmin = currentUser?.role === "admin";

  const value: AuthContextType = {
    currentUser,
    session,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    resetPassword,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

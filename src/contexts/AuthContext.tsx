
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";
import { User, AuthContextType } from "@/types/auth.types";
import { enhanceUserWithCustomProps } from "@/utils/auth.utils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
          const user = enhanceUserWithCustomProps(session.user);
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
        const user = enhanceUserWithCustomProps(session.user);
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

export { AuthContext };
export { useAuth } from "@/hooks/useAuth";

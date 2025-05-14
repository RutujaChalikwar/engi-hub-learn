
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Mock user type - will be replaced with Firebase User type
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
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
  const [loading, setLoading] = useState(true);

  // Mock authentication methods
  // These will be replaced with actual Firebase Auth methods
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock sign in logic
      console.log(`Sign in with ${email} and ${password}`);
      // For demo purposes only - will be replaced with Firebase auth
      const mockUser: User = {
        id: "user123",
        email: email,
        displayName: email.split("@")[0],
        photoURL: null,
        role: email.includes("admin") ? "admin" : "user",
      };
      setCurrentUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Mock Google sign in logic
      console.log("Sign in with Google");
      // For demo purposes only
      const mockUser: User = {
        id: "google123",
        email: "user@example.com",
        displayName: "Google User",
        photoURL: "https://via.placeholder.com/150",
        role: "user",
      };
      setCurrentUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      // Mock sign up logic
      console.log(`Sign up with ${email}, ${password}, and ${displayName}`);
      // For demo purposes only
      const mockUser: User = {
        id: "newuser123",
        email: email,
        displayName: displayName,
        photoURL: null,
        role: "user",
      };
      setCurrentUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Mock sign out logic
      console.log("Sign out");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Mock reset password logic
      console.log(`Reset password for ${email}`);
    } catch (error) {
      console.error("Error resetting password", error);
      throw error;
    }
  };

  useEffect(() => {
    // This will be replaced with Firebase auth state listener
    const checkAuth = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(checkAuth);
  }, []);

  const isAdmin = currentUser?.role === "admin";

  const value: AuthContextType = {
    currentUser,
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

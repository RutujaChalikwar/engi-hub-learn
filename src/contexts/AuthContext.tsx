
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

// Add a localStorage key for persisting auth state
const USER_STORAGE_KEY = "edu_engineer_user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Helper function to persist user to localStorage
  const persistUser = (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    setCurrentUser(user);
  };

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
      persistUser(mockUser);
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
      persistUser(mockUser);
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
      persistUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Mock sign out logic
      console.log("Sign out");
      persistUser(null);
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
      {children}
    </AuthContext.Provider>
  );
};

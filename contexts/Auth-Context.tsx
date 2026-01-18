import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth, provider } from '../lib/firebase';

// By declaring the firebase namespace and the User interface, we provide TypeScript 
// with the necessary type information for the `firebase.User` type, which is available 
// globally from the Firebase CDN script. This resolves the "Cannot find namespace 'firebase'" error.
declare namespace firebase {
  interface User {
    uid: string;
    photoURL: string | null;
    isAnonymous: boolean;
    email: string | null;
  }
}

type User = firebase.User;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInAsGuest: () => Promise<void>;
  deleteUserAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Explicitly typing `user` here for better type safety.
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
        setLoading(false);
    }
  };
  
  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        await auth.signInWithEmailAndPassword(email, pass);
    } finally {
        setLoading(false);
    }
  }
  
  const signUpWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
        await auth.createUserWithEmailAndPassword(email, pass);
    } finally {
        setLoading(false);
    }
  }

  const signInAsGuest = async () => {
    setLoading(true);
    try {
        await auth.signInAnonymously();
    } catch (error) {
        console.error("Error signing in as guest", error);
    } finally {
        setLoading(false);
    }
  }

  const signOutUser = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const deleteUserAccount = async () => {
    try {
      if (user) {
        await user.delete();
        // Note: Firebase will automatically sign out the user after deletion
      }
    } catch (error) {
      console.error("Error deleting account", error);
      throw error; // Re-throw so the UI can handle it
    }
  };

  const value = { user, loading, signInWithGoogle, signOutUser, signInWithEmail, signUpWithEmail, signInAsGuest, deleteUserAccount };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

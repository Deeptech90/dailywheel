import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInAnonymously, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, hasFirebase } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInGuest: () => Promise<void>;
  logout: () => Promise<void>;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signInWithGoogle: async () => {},
  signInGuest: async () => {},
  logout: async () => {},
  isGuest: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebase || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Auto sign-in anonymously if no user is present
      if (!currentUser && auth) {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error("Failed anonymous sign-in", e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInGuest = async () => {
    if (!auth) return;
    await signInAnonymously(auth);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const isGuest = user ? user.isAnonymous : true;

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInGuest, logout, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

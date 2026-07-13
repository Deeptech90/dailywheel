import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  signInAnonymously,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isGuest: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  isGuest: true,
  loading: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      return;
    }
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      
      if (!currentUser || !db) {
        setUserProfile(null);
        // Auto sign-in anonymously if no user is present
        try {
          if (auth) await signInAnonymously(auth);
        } catch (e) {
          console.error("Failed anonymous sign-in", e);
          setLoading(false);
        }
        return;
      }

      const userRef = doc(db, 'users', currentUser.uid);
      
      const unsubscribeDoc = onSnapshot(userRef, async (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        } else {
          const newUser: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'User',
            photoURL: currentUser.photoURL || '',
            isAdmin: false,
            subscription: {
              plan: 'free',
              status: 'active',
              currentPeriodEnd: 0,
              cancelAtPeriodEnd: false
            },
            stats: {
              generationsToday: 0,
              lastGenerationDate: Date.now(),
              referralsCount: 0,
              referralCode: Math.random().toString(36).substring(2, 8).toUpperCase()
            }
          };
          
          await setDoc(userRef, {
            ...newUser,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          });
          setUserProfile(newUser);
        }
        setLoading(false);
      });

      return () => unsubscribeDoc();
    });

    return () => unsubscribeAuth();
  }, []);

  const signInWithGoogle = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const value = {
    user: userProfile,
    firebaseUser,
    isGuest: firebaseUser ? firebaseUser.isAnonymous : true,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

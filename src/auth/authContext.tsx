'use client'
import React, { useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth , db } from "./firebase";

interface AuthContextType {
  userLoggedIn: boolean;
  hasPaid: boolean,
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  userLoggedIn: false,
  hasPaid: false,
  isEmailUser: false,
  isGoogleUser: false,
  currentUser: null,
  loading: true,
});


export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);


  const checkOrCreateUserPaymentStatus = async (user: User) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        // If user document exists, get the payment status
        const userData = userDoc.data();
        setHasPaid(userData.hasPaid || false);
      } else {
        // If user document doesn't exist, create it with default payment status
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          hasPaid: false,
          createdAt: new Date()
        });
        setHasPaid(false);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setHasPaid(false);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          console.log(user.displayName)
          setCurrentUser(user);
          setUserLoggedIn(true);
          
          // Use proper provider comparison
          const isEmail = user.providerData.some(
            (provider) => provider.providerId === 'password'
          );
          
          const isGoogle = user.providerData.some(
            (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
          );

          setIsEmailUser(isEmail);
          setIsGoogleUser(isGoogle);

          await checkOrCreateUserPaymentStatus(user);
          
        } else {
          console.log('No authenticated user');
          setCurrentUser(null);
          setUserLoggedIn(false);
          setIsEmailUser(false);
          setHasPaid(false);
          setIsGoogleUser(false);
        }
      } catch (error) {
        console.error('Auth state error:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

 
  const value = {
    userLoggedIn,
    isEmailUser,
    hasPaid,
    isGoogleUser,
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
       {children}
    </AuthContext.Provider>
  );
}
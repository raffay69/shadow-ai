import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  updateProfile,
  signInWithRedirect
} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string // Add displayName as an argument
) => {
  try {
    // Create the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update the user's profile with the displayName
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: displayName,
    });

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      displayName: displayName,
      hasPaid: false,
      createdAt: new Date()
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};


//also add verification on email 
export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
};

export const doSignInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const provider = new GoogleAuthProvider();
      
      // Add these configurations
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({ display: 'popup' });
  
      const result = await signInWithPopup(auth, provider);
      // Create user document if it doesn't exist
      
    const user = result.user;
    const userDocRef = doc(db, "users", user.uid);
    
    // Check if document exists first
    const docSnap = await getDoc(userDocRef);
    
    if (!docSnap.exists()) {
      // Create new user document with payment status
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        hasPaid: false,
        createdAt: new Date(),
        authProvider: "google"
      });
      console.log("Created new user document for Google sign-in");
    }

      return result;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

export const doSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
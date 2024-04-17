import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  signInWithEmailAndPassword,
  updateCurrentUser,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [photoURL, setPhotoURL] = useState();
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    console.log("logged out");
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function confirmResetPassword(oobCode, newPassword) {
    console.log("confirmResetPassword was called");
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function validatePasswordResetCode(oobCode) {
    return verifyPasswordResetCode(auth, oobCode);
  }

  function updateCurrentUserWithPhotoURL(photoURL) {
    updateCurrentUser(auth, { ...auth.currentUser, photoURL: photoURL });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        console.log("user initiated", user.email);
      }
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (!currentUser) return;
    currentUser.getIdTokenResult().then((idToken) => {
      console.log("admin:",idToken.claims.admin);
    });
  }, [currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
    photoURL,
    setPhotoURL,
    signup,
    login,
    logout,
    resetPassword,
    confirmResetPassword,
    validatePasswordResetCode,
    updateCurrentUserWithPhotoURL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

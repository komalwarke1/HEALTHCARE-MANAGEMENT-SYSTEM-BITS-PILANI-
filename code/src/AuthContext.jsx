import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to not logged in
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLogin(true);
        setUser(firebaseUser);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [auth]);

  const signInWithToken = async (token) => {
    try {
      await signInWithCustomToken(auth, token);
      setIsLogin(true);
    } catch (error) {
      console.error("Failed to sign in with token:", error);
      setIsLogin(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setIsLogin(false);
      setUser(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const value = { isLogin, user, signInWithToken, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

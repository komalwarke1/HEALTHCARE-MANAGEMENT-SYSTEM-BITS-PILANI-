import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfileContext = createContext();
const db = getFirestore();
const auth = getAuth();

export const ProfileProvider = ({ children }) => {
  const [patientInfo, setpatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Fetch profile after auth state is confirmed
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setpatientInfo(null);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setpatientInfo(docSnap.data());
        } else {
          console.log("No such document!");
          
          const defaultProfile = {
            userId: user.uid,
            email: user.email,
            createdAt: new Date().toISOString(),
          };
          await setDoc(docRef, defaultProfile);
          setpatientInfo(defaultProfile);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (profileData) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setIsLoading(true);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        ...profileData,
        updatedAt: new Date().toISOString()
      });

      setpatientInfo(prev => ({
        ...prev,
        ...profileData,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      setIsLoading(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setpatientInfo(docSnap.data());
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    patientInfo,
    isLoading,
    error,
    updateProfile,
    refreshProfile,
    user
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
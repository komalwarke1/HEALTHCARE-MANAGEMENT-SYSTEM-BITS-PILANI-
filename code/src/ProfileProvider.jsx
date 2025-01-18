import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileContext = createContext();
const db = getFirestore();
const auth = getAuth();

export const ProfileProvider = ({ children }) => {
  const [patientInfo, setpatientInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not authenticated");
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setpatientInfo(docSnap.data());
        } else {
          console.log("No such document!");
          // Optionally create a default profile
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("User not authenticated");
      }

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
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("User not authenticated");
      }

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
    refreshProfile
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
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '../firebase';
import { setAuthToken } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Wait before rendering

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const token = await u.getIdToken();
          setAuthToken(token);   // ✅ Set auth header for axios
          setUser(u);
        } catch (error) {
          console.error('🔐 Error fetching auth token:', error.message);
          setAuthToken(null);
          setUser(null);
        }
      } else {
        setAuthToken(null);     // ✅ Clear on logout
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setAuthToken(null);   // ✅ Clear token from axios
      setUser(null);        // ✅ Clear local user state
    } catch (error) {
      console.error('🚪 Error signing out:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

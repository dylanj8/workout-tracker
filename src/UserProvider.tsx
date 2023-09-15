import React, { useState, useContext, useEffect, createContext } from "react";
import { auth, signInWithEmailAndPassword, signOut } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signIn: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

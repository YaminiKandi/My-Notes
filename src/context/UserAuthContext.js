import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth'
import {auth} from '../firebase'

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      setUser(currentUser)
      return () => {
        unsubscribe();
    }})
  }, [])
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  } 
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    return signOut(auth);
  }
  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider)
  }
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }
  return(
    <UserAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn, resetPassword}}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = () => {
  return useContext(UserAuthContext)
}
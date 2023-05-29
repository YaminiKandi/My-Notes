import {db} from '../firebase'
import { 
  collection,
  setDoc, 
  getDoc, 
  updateDoc,
  deleteField,
  doc 
} from 'firebase/firestore'

const dbCollection = collection(db, 'notes')

const getDocRef = (user) => {
  if (user.email) {
    return doc(dbCollection, user.email)
  } else {
    return null
  }
}

export const addData = async (newData, user) => {
  const docRef = getDocRef(user)
  if (!docRef) { return new Error('User is not logged in')}
  const userDoc = await getDoc(docRef)
  
  if (userDoc.exists()) {
    return updateDoc(docRef, newData)
  } else {
    return setDoc(docRef, newData)
  }
}

export const getData = async (user) => {
  const docRef = getDocRef(user)
  const userDoc = await getDoc(docRef)
  return userDoc.exists() ? userDoc.data() : {}
}

export const deleteData = async (user, id) => {
  const docRef = getDocRef(user);
  if (!docRef) {return new Error('User is not logged in')}
  const userDoc = await getDoc(docRef)
  if (userDoc.exists()) {
    return updateDoc(docRef, {
      [id]: deleteField()
    })
  } else {
    return new Error('Document not found')
  }
}

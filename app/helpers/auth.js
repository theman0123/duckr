import firebase from 'firebase'
import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
  const provider = new firebase.auth.FacebookAuthProvider()
  return firebaseAuth().signInWithPopup(provider)
}

export const checkIfAuthed = (store) => {
  return store.getState().user.isAuthed === true
}

export const logout = () => {
  return firebaseAuth().signOut()
}

export const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

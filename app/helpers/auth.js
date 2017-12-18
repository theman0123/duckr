import firebase from 'firebase'
import { ref, firebaseAuth } from 'config/constants'

const auth = () => {
  const provider = new firebase.auth.FacebookAuthProvider()
  return firebaseAuth().signInWithPopup(provider)
}

export default auth


export const checkIfAuthed = (store) => {
  return store.getState().user.isAuthed
}

export const logout = () => {
  return firebaseAuth().signOut()
}

export const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then((user) => user)
}
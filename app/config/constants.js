import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAi5T29R8F0IYLZxi9hAmhJE-LiDCc_mqo',
  authDomain: 'redux-tutorial-24712.firebaseapp.com',
  databaseURL: 'https://redux-tutorial-24712.firebaseio.com',
  projectId: 'redux-tutorial-24712',
  storageBucket: 'redux-tutorial-24712.appspot.com',
  messagingSenderId: '179730332501',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const userDucksExpirationLength = 100000
export const userExpirationLength = 100000

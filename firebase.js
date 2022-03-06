import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAk_9Cmi1d3NASf_77qmgmmvt5U0Af5zSE',
  authDomain: 'facebook2-app.firebaseapp.com',
  projectId: 'facebook2-app',
  storageBucket: 'facebook2-app.appspot.com',
  messagingSenderId: '200688784054',
  appId: '1:200688784054:web:6e68d6c1fde793f08f4c17',
}

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

const storage = firebase.storage()

export { db, storage }

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAk_9Cmi1d3NASf_77qmgmmvt5U0Af5zSE',
  authDomain: 'facebook2-app.firebaseapp.com',
  projectId: 'facebook2-app',
  storageBucket: 'facebook2-app.appspot.com',
  messagingSenderId: '200688784054',
  appId: '1:200688784054:web:6e68d6c1fde793f08f4c17',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }

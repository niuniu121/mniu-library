// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyA8yr03Llyr7rJp_Oc77wAJylsGdCcFc_c',
//   authDomain: 'week7-mengxueniu.firebaseapp.com',
//   projectId: 'week7-mengxueniu',
//   storageBucket: 'week7-mengxueniu.appspot.com',
//   messagingSenderId: '836883032049',
//   appId: '1:836883032049:web:b7b350e4f971a171ee4650'
// }

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4Zt5BKNoGJExt2bdyJpObeaY-AgVm0p8',
  authDomain: 'week7-mengxueniu-dba68.firebaseapp.com',
  projectId: 'week7-mengxueniu-dba68',
  storageBucket: 'week7-mengxueniu-dba68.appspot.com',
  messagingSenderId: '516646869002',
  appId: '1:516646869002:web:a88e26334740f0d4d8e7f3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()
export default db

// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8yr03Llyr7rJp_Oc77wAJylsGdCcFc_c',
  authDomain: 'week7-mengxueniu.firebaseapp.com',
  projectId: 'week7-mengxueniu',
  storageBucket: 'week7-mengxueniu.appspot.com',
  messagingSenderId: '836883032049',
  appId: '1:836883032049:web:b7b350e4f971a171ee4650'
}

// Initialize Firebase
initializeApp(firebaseConfig)

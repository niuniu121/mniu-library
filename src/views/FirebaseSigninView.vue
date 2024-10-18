<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const adminEmail = 'admin@gmail.com'

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      if (userCredential.user.email == adminEmail) {
        alert('Hi Admin!')
        router.push('/Login')
      } else {
        alert('Congratulation! Login succeed!')
        router.push('/')
      }
      console.log('Login succeed!')
      //console.log('Firebase Register Successful!')
      console.log('userCredential', userCredential)
      console.log('userCredential.user', userCredential.user)
      console.log('Congratulation! Login succeed!')
      console.log('Home auth current user:', getAuth().currentUser)
      router.push('/')
      console.log(auth.currentUser) // To check the current User signed in
    })
    .catch((error) => {
      console.log('login failed')
      const errorCode = error.code
      console.log(error.code)
      console.log('Login error code', errorCode)
    })
}
</script>

<style>
h1 {
  text-align: center;
}
p {
  text-align: center;
}
</style>

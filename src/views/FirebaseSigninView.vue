<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Register Successful!')
      router.push('/')
      console.log(auth.currentUser) // To check the current User signed in
    })
    .catch((error) => {
      console.log(error.code)
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

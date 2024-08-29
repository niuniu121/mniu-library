<script setup>
import { ref } from 'vue'
import router from '../router'
import { useAuth } from '../router/authenticate'

const hardCodUserName = 'user'
const hardCodePassword = '12345678'
const { isAuthenticated } = useAuth()

const formData = ref({
  username: '',
  password: ''
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    formData.value.username === hardCodUserName &&
    formData.value.password === hardCodePassword
  ) {
    alert('login success')
    isAuthenticated.value = true
    console.log('log in view', isAuthenticated.value)
    router.push({ name: 'About' })
    // submittedCards.value.push({ ...formData.value })
    // clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
}

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (formData.value.password.length < 8) {
    if (blur) errors.value.password = `Password must be at least 8 characters long.`
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ W5. Please login</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 offset-md-4">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username:</label>
              <input
                type="text"
                class="form-control"
                id="username"
                autocomplete="current-password"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>
          <div class="row mb-3 offset-md-4">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                autocomplete="current-password"
                @blur="() => validatePassword(true)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>

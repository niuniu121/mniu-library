<template>
  <div id="app">
    <h1>Book Courter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of Books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    //const response = await axios.get('https://your-cloud-function-url/countBooks')
    const response = await axios.get(
      'http://localhost:5001/week7-mengxueniu-dba68/us-central1/countBooks',
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    )
    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    count.value = null
  }
}
</script>

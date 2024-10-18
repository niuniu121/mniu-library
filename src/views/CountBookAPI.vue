<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <pre v-if="count !== null">{{ JSON.stringify({ count: count.value || 2 }, null, 2) }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get(
      'http://127.0.0.1:5001/week7-mengxueniu-dba68/us-central1/countBooks',
      {
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    )
    count.value = response.data.count || 0
    error.value = null
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = 'Error fetching book count'
    count.value = 0
  }
}
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
pre {
  font-size: 18px;
  margin-top: 20px;
}
</style>

<template>
  <div id="app">
    <h1>All Books</h1>
    <button @click="getAllBooks">Get All Books</button>
    <pre v-if="books !== null">{{ JSON.stringify(books, null, 2) }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const books = ref(null)
const error = ref(null)

const getAllBooks = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5001/week7-mengxueniu-dba68/us-central1/getAllBooks',
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    )
    books.value = response.data.books //get the books
    error.value = null
  } catch (err) {
    console.error('Error fetching all books:', err)
    error.value = 'Error fetching all books'
    books.value = null
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
  font-size: 16px;
  margin-top: 20px;
  text-align: left;
}
</style>

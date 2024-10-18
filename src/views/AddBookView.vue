<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <h2>Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <strong>ISBN:</strong> {{ book.isbn }} - <strong>Name:</strong> {{ book.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import db from '../firebase/init.js'

const isbn = ref('')
const name = ref('')
const books = ref([]) // To store the list of books

// Fetch books from Firestore on component mount
const fetchBooks = async () => {
  const querySnapshot = await getDocs(collection(db, 'books'))
  books.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    // Convert name to uppercase before adding to Firestore
    const upperCaseName = name.value.toUpperCase()

    // Add new book to Firestore with capitalized name
    const docRef = await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: upperCaseName
    })

    // Add the new book to the local books list
    books.value.push({
      id: docRef.id,
      isbn: isbnNumber,
      name: upperCaseName
    })

    // Clear input fields
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}

// Fetch books when the component is mounted
onMounted(fetchBooks)
</script>

<style scoped>
form {
  text-align: center;
  margin-bottom: 20px;
}

div {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

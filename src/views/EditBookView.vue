<template>
  <div>
    <h1>Edit Book</h1>
    <form @submit.prevent="editBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Update Book</button>
    </form>

    <h2>Filter, Sort, and Limit Books</h2>
    <form @submit.prevent="filterBooks">
      <div>
        <label for="filterIsbn">ISBN:</label>
        <input type="text" v-model="filterIsbn" id="filterIsbn" />
      </div>
      <div>
        <label for="sortField">Sort by:</label>
        <select v-model="sortField">
          <option value="isbn">ISBN</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div>
        <label for="limitResults">Limit Results:</label>
        <input type="number" v-model="limitResults" id="limitResults" min="1" />
      </div>
      <button type="submit">Filter, Sort & Limit</button>
    </form>

    <h2>Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <strong>ISBN:</strong> {{ book.isbn }} - <strong>Name:</strong> {{ book.name }}
        <button @click="loadBook(book.id)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

const isbn = ref('')
const name = ref('')
const filterIsbn = ref('') // To store the ISBN to filter
const sortField = ref('isbn') // Field to sort by, default is 'isbn'
const limitResults = ref(10) // Default limit of 10 results
const books = ref([]) // To store the list of books
let currentBookId = null // To store the currently selected book ID

// Fetch all books from Firestore on component mount with sorting and limit
const fetchBooks = async () => {
  const booksQuery = query(
    collection(db, 'books'),
    orderBy(sortField.value),
    limit(Number(limitResults.value)) // Apply the limit based on user input
  )
  const querySnapshot = await getDocs(booksQuery)
  books.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Filter books by ISBN, apply sorting and limit
const filterBooks = async () => {
  try {
    let booksQuery

    if (filterIsbn.value) {
      // Filter books by ISBN, apply sorting, and limit
      booksQuery = query(
        collection(db, 'books'),
        where('isbn', '==', Number(filterIsbn.value)),
        orderBy(sortField.value),
        limit(Number(limitResults.value)) // Apply limit based on user input
      )
    } else {
      // Apply sorting and limit only when no filter is provided
      booksQuery = query(
        collection(db, 'books'),
        orderBy(sortField.value),
        limit(Number(limitResults.value)) // Apply limit
      )
    }

    const querySnapshot = await getDocs(booksQuery)
    books.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    alert('Filter, sorting, and limit applied!')
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

// Load the book data into the form for editing
const loadBook = async (id) => {
  try {
    currentBookId = id
    const docRef = doc(db, 'books', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const bookData = docSnap.data()
      isbn.value = bookData.isbn
      name.value = bookData.name
    } else {
      alert('No such book!')
    }
  } catch (error) {
    console.error('Error fetching book:', error)
  }
}

// Update the book in Firestore
const editBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    if (currentBookId) {
      const docRef = doc(db, 'books', currentBookId)
      await updateDoc(docRef, {
        isbn: isbnNumber,
        name: name.value
      })

      // Update the book in the local list of books
      const bookIndex = books.value.findIndex((book) => book.id === currentBookId)
      books.value[bookIndex].isbn = isbnNumber
      books.value[bookIndex].name = name.value

      alert('Book updated successfully!')

      // Clear input fields after update
      isbn.value = ''
      name.value = ''
      currentBookId = null
    } else {
      alert('No book selected for editing!')
    }
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

// Delete the book from Firestore
const deleteBook = async (id) => {
  try {
    const docRef = doc(db, 'books', id)
    await deleteDoc(docRef)

    // Remove the deleted book from the local list of books
    books.value = books.value.filter((book) => book.id !== id)

    alert('Book deleted successfully!')
  } catch (error) {
    console.error('Error deleting book:', error)
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

button {
  margin-left: 10px;
}
</style>

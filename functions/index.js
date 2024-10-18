/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
// const logger = require("firebase-functions/logger");
admin.initializeApp()
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      //   const booksCollection = admin.firestore().collection('books')
      //   const snapshot = await booksCollection.get()
      //   const count = snapshot.size
      res.set('Cache-Control', 'no-store')
      res.status(200).send({ count: 2 })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const books = [
        { id: 1, title: 'Book One', author: 'jake', isbn: '123456' },
        { id: 2, title: 'Book Two', author: 'Alice', isbn: '654321' }
      ]

      res.set('Access-Control-Allow-Origin', '*')
      res.set('Cache-Control', 'no-store')
      res.status(200).send({ books })
    } catch (error) {
      console.error('Error getting books:', error.message)
      res.status(500).send('Error getting all books')
    }
  })
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

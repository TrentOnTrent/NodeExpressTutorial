const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const author_controller = require("../controllers/authorController");
const book_controller = require("../controllers/bookController");
const book_instance_controller = require("../controllers/bookinstanceController");
const genre_controller = require("../controllers/genreController");

/// BOOK ROUTES ///

// Home page
router.get("/", book_controller.index);

// Creating a new book
router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);

// Deleting a book
router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);

// Updating a book
router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);

// Getting a single book
router.get("/book/:id", book_controller.book_detail);
// Getting a list of all books
router.get("/books/", book_controller.book_list);

/// AUTHOR ROUTES ///

// Create author - get
router.get("/author/create", author_controller.author_create_get);
// Create author - post
router.post("/author/create", author_controller.author_create_post);

// Delete author - get
router.get("/author/:id/delete", author_controller.author_delete_get);
// Delete author - post
router.post("/author/:id/delete", author_controller.author_delete_post);

// Update author - get
router.get("/author/:id/update", author_controller.author_update_get);
// Update author - post
router.post("/author/:id/update", author_controller.author_update_post);

// Get author detail
router.get("/author/:id", author_controller.author_detail);
// Get list of all authors
router.get("/authors/", author_controller.author_list);

/// GENRE ROUTES ///

// Create genre - get
router.get("/genre/create", genre_controller.genre_create_get);
// Create genre - post
router.post("/genre/create", genre_controller.genre_create_post);

// Delete genre - get
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
// Delete genre - post
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// Update genre - get
router.get("/genre/:id/update", genre_controller.genre_update_get);
// Update genre - post
router.post("/genre/:id/update", genre_controller.genre_update_post);

// Get genre detail
router.get("/genre/:id", genre_controller.genre_detail);
// Get list of all genres
router.get("/genres/", genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// Create bookinstance - get
router.get("/bookinstance/create", book_instance_controller.bookinstance_create_get);
// Create bookinstance - post
router.post("/bookinstance/create", book_instance_controller.bookinstance_create_post);

// Delete bookinstance - get
router.get("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_get);
// Delete bookinstance - post
router.post("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_post);

// Update bookinstance - get
router.get("/bookinstance/:id/update", book_instance_controller.bookinstance_update_get);
// Update bookinstance - post
router.post("/bookinstance/:id/update", book_instance_controller.bookinstance_update_post);

// Get bookinstance detail
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);
// Get list of all bookinstances    
router.get("/bookinstances/", book_instance_controller.bookinstance_list);

module.exports = router;


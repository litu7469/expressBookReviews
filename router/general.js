const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();

  const result = Object.values(books).filter(book =>
    book.author.toLowerCase() === author
  );

  res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();

  const result = Object.values(books).filter(book =>
    book.title.toLowerCase() === title
  );

  res.status(200).json(result);
});

// Get book review
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.status(200).json(book.reviews || {});
});

module.exports.general = public_users;
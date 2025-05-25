import Book from "../models/book.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add book
const createBook = async (req, res) => {
  const { image, title, author, price, genre, bookstatus, description } =
    req.body;

  try {
    const imageResponse = await cloudinary.uploader.upload(image, {
      folder: "/Bookory",
    });

    const user = req.user;

    const book = await Book.create({
      image: imageResponse.secure_url,
      title,
      author,
      price,
      genre,
      bookstatus,
      description,
      user,
    });

    return res.status(200).json({ message: "Book added successfully.", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch books
const fetchbooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch a single book
const fetchBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fecth similar books
const fetchSimilarBooks = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    const similarBooks = await Book.find({
      genre: { $regex: `^${book.genre}$`, $options: "i" },
      _id: { $ne: book._id },
    }).limit(4);

    res.status(200).json({ similarBooks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.deleteOne({ _id: bookId });
    res.json({ message: "The bokk is deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const update = req.body;

    await Book.updateOne({ _id: bookId }, update);
    res.json({ message: "Book updated successfuly!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search books
const searchBooks = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(200).json({ books: [] });
    }

    // Search across multiple fields
    const books = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
        { genre: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createBook,
  fetchbooks,
  fetchBook,
  deleteBook,
  updateBook,
  searchBooks,
  fetchSimilarBooks,
};

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

    const book = await Book.findById(bookId);

    // Delete the image first
    const parts = book.image.split("/");
    const fileName = parts[parts.length - 1]; // Extract the last part: "ihwklaco9wt2d0kqdqrs.png"
    const imageId = fileName.split(".")[0];
    cloudinary.uploader
      .destroy(`Bookory/${imageId}`)
      .then((result) => console.log("result: ", result));

    // Then delete from database
    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { updateData } = req.body;

    const book = await Book.findById(bookId);

    // This is when the image is changed
    if (updateData.image && updateData.image.startsWith("data:image")) {
      // Delete the previous one first
      const parts = book.image.split("/");
      const fileName = parts[parts.length - 1]; // Extract the last part: "ihwklaco9wt2d0kqdqrs.png"
      const imageId = fileName.split(".")[0];
      cloudinary.uploader
        .destroy(`Bookory/${imageId}`)
        .then((result) => console.log("result: ", result));

      // Then upload the new one
      const imageResponse = await cloudinary.uploader.upload(updateData.image, {
        folder: "/Bookory",
      });

      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
          ...updateData,
          image: imageResponse.secure_url,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Book updated successfully.", book: updatedBook });
    }

    // when the image is  not updated.
    const updatedBook = await Book.updateOne({ _id: bookId }, updateData);
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully!", book: updatedBook });
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

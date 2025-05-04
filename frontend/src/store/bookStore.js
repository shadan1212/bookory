import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/book";
axios.defaults.withCredentials = true;

export const useBookStore = create((set) => ({
  // intitial states
  book: null,
  books: [],
  similarBooks: [],
  searchResults: [],
  isLoading: false,
  error: null,
  message: null,

  // functions
  addBook: async (
    image,
    title,
    author,
    price,
    genre,
    bookstatus,
    description
  ) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/add-book`, {
        image,
        title,
        author,
        price,
        genre,
        bookstatus,
        description,
      });
      const { message, book } = response.data;

      set({ book, message, isLoading: false });
      return { message, book };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error adding book.",
      });
      throw error;
    }
  },

  fetchBooks: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/books`);

      set({ books: response.data.books, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error fetching books.",
      });
      throw error;
    }
  },

  // fetch a book
  fetchBook: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/${id}`);

      set({ book: response.data.book, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error fetching book.",
      });
      throw error;
    }
  },

  // Fetch similar books
  fetchSimilarBooks: async (id) => {
    set({ error: null });
    try {
      const response = await axios.get(`${API_URL}/similar/${id}`);

      set({ similarBooks: response.data.similarBooks });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error fetching similar books.",
      });
      throw error;
    }
  },

  // Search books
  searchBooks: async (searchTerm) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_URL}/search/?searchTerm=${encodeURIComponent(searchTerm)}`
      );

      set({ searchResults: response.data.books, isLoading: false });
      // console.log(searchResults);
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error searching books.",
      });
      throw error;
    }
  },
}));

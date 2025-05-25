import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import toast from "react-hot-toast";
import BookCard from "../components/BookCard";

const SearchPage = () => {
  const { searchBooks, searchResults, isLoading, error } = useBookStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Check for search term in URL on initial load
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) searchBooks(searchTerm);
    }, 500);
    const querySearchTerm = searchParams.get("searchTerm");
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
      performSearch(querySearchTerm);
    }
    return () => clearTimeout(delay);
  }, [searchParams]);

  // Separate search execution function
  const performSearch = async (term) => {
    if (!term || term.trim() === "") {
      return;
    }

    try {
      searchBooks(term);
      setHasSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleSearch = () => {
    if (!searchTerm || searchTerm.trim() === "") {
      alert("Please enter a search term");
      return;
    }

    setSearchParams({ searchTerm });
    performSearch(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
      <Link to={"/"}>
        <div className="flex items-center text-gray-1 hover:text-black cursor-pointer mb-6">
          <ChevronLeft className="h-4 w-4" />
          <p className="text-gray-1 hover:text-black">Back</p>
        </div>
      </Link>
      <h1 className="text-burgandy text-4xl text-center font-bold font-playflair">
        Search Books
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" relative flex items-center justify-center gap-0 mt-10"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-150 py-3 px-6 border-gray-300 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-brown-2"
          placeholder="Search by title, author, or genre..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-brown-2 text-white font-medium px-5 p-3 rounded-r-md cursor-pointer"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {hasSearched && (
        <div className="max-w-6xl mx-auto mt-8">
          <h2 className="text-2xl font-medium font-poppins text-center mb-4">
            Search Results: {searchResults.length}{" "}
            {searchResults.length === 1 ? "book" : "books"} found
          </h2>

          {searchResults.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-1">
                No books found matching "{searchTerm}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {searchResults.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

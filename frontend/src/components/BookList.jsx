import { useEffect, useRef } from "react";
import { useBookStore } from "../store/bookStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";

const BookList = () => {
  const { books, fetchBooks } = useBookStore();
  const scrollRef = useRef();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const popularBooks = books.filter((book) => book.bookstatus === "popular");

  return (
    <div id="books" className="bg-[#faf9f5] p-6 lg:px-20 py-10">
      <h1 className="text-3xl text-burgandy font-bold font-playflair">
        Trending Books
      </h1>
      <div className="w-full relative">
        {/* Scroll buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-6 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-6 z-10 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
        >
          <ChevronRight />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 no-scrollbar p-4"
        >
          {popularBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;

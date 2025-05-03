import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import { useEffect } from "react";
import BookCard from "../components/BookCard";

const BookDetails = () => {
  const { book, fetchBook, similarBooks, fetchSimilarBooks } = useBookStore();
  const params = useParams();

  useEffect(() => {
    fetchBook(params.id);

    fetchSimilarBooks(params.id);
  }, [fetchBook, params.id, fetchSimilarBooks]);

  console.log(similarBooks);
  return (
    <div className="bg-cream-2 mt-18 min-h-screen py-12 px-6 lg:px-30">
      <Link to={"/?scroll=books"}>
        <div className="flex items-center text-gray-1 hover:text-black cursor-pointer">
          <ChevronLeft className="h-4 w-4" />
          <p className="">Back to Books</p>
        </div>
      </Link>
      <div className="mt-10 flex flex-col lg:flex-row gap-8 overflow-hidden">
        {/* image section */}
        <img
          src={book?.image}
          alt={book?.title}
          className="w-full object-cover rounded-xl shadow-md lg:w-1/4 lg:h-[75vh] lg:ml-20"
        />

        {/* details section */}
        <div className="w-full  lg:w-2/4">
          <div className="border-b border-gray-300">
            <h1 className="text-3xl font-playflair font-bold mb-2">
              {book?.title}
            </h1>
            <p className="text-gray-1 text-xl mb-6">{book?.author}</p>
            <button className="px-3 py-1 bg-brown-2 rounded-3xl text-white font-medium mb-6">
              {book?.genre}
            </button>
            <p className="font-medium text-2xl mb-6">${book?.price}</p>
            <p className="line-clamp-4 text-lg font-normal">
              {book?.description}
            </p>
            <div className="flex gap-4 mt-8 mb-8">
              <button className="bg-burgandy px-7 py-2 rounded-md flex gap-3 items-center justify-center text-white  hover:bg-burgandy/90 cursor-pointer">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">Add to cart</span>
              </button>
              <button className="bg-cream-2 border border-gray-1 px-7 py-2 rounded-md text-black hover:bg-white cursor-pointer">
                <span className="text-sm font-medium">Buy Now</span>
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h2 className="font-playflair font-bold text-lg">Details</h2>
            <div className="flex items-center gap-50">
              <p className="font-medium text-gray-1">Genre</p>
              <p className="font-light">{book?.genre}</p>
            </div>
            <div className="flex items-center gap-50">
              <p className="font-medium text-gray-1">Added</p>
              <p className="font-light">
                {new Date(book?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <h1 className="font-playflair text-2xl font-bold">Similar Books</h1>
        {similarBooks.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 ">
            {similarBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-1 mt-4">No similar books found!!</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

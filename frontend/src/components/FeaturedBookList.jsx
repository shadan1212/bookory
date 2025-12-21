import { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { Link } from "react-router-dom";

const FeaturedBookList = () => {
  const { featuredBooks, fetchHomeBooks } = useBookStore();

  useEffect(() => {
    fetchHomeBooks();
  }, [fetchHomeBooks]);

  return (
    <div className="bg-[#f5f2d3] p-6 lg:px-20 py-10">
      <h1 className="text-3xl text-burgandy font-bold font-playflair text-center">
        Featured Books
      </h1>

      {/* Book Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {featuredBooks.map((book) => (
          <Link key={book._id} to={`/book/${book._id}`}>
            <div
              key={book._id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Left Image */}
              <img
                src={book.image}
                alt={book.title}
                className="w-1/2 object-cover"
              />

              {/* Right Content */}
              <div className="p-6 flex flex-col justify-between w-1/2">
                <div>
                  <h2 className="text-2xl font-bold mb-2 font-playflair">
                    {book.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <p className="mb-4 text-sm line-clamp-3">
                    {book.description}
                  </p>
                </div>
                <div className="flex flex-col justify-start md:flex-row items-center md:justify-between">
                  <p className="text-lg font-semibold">${book.price}</p>
                  <button className="bg-brown-2 text-sm hover:bg-brown-700 text-white font-medium py-2 px-3 rounded cursor-pointer">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBookList;

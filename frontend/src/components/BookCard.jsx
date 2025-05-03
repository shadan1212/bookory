import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <section className="pt-8">
      <Link to={`/book/${book._id}`}>
        <div className="w-[250px] rounded-md shadow-md overflow-hidden">
          <img
            src={book.image}
            alt="Book-Image"
            className="w-full h-90 object-cover"
          />
          <div className="p-4 bg-white">
            <h3 className="font-playflair font-bold text-xl truncate">
              {book.title}
            </h3>
            <p className="text-gray-500 mb-3">{book.author}</p>
            <div className="flex items-center justify-between">
              <p className="text-black font-semibold">${book.price}</p>
              <div className="bg-cream-2 px-4 py-3 rounded-md border border-gray-300 cursor-pointer">
                <ShoppingCart className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default BookCard;

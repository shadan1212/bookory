import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import toast from "react-hot-toast";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { book, isLoading, error, deleteBook, fetchBook } = useBookStore();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id, fetchBook]);

  if (error) {
    return (
      <div className="mt-20 container mx-auto p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order? This action cannot be undone."
    );

    if (!confirmCancel) {
      return;
    }

    const { message } = await deleteBook(id);
    toast.success(message);
    setTimeout(() => {
      navigate("/admin");
    }, 1500);
  };

  return (
    <div className="mt-18 min-h-screen bg-cream-2 py-12 px-6 lg:px-30">
      <div className="container mx-auto flex items-center h-[50vh] bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="w-full p-4 border border-gray-200 rounded-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <img
              src={book?.image}
              alt="Book Image"
              className="w-20 h-30 object-cover rounded border border-gray-200 hover:opacity-80 transition-opacity"
            />
            <div className="flex-grow">
              {/* <Link to={`/book/${item.book?._id}`} className="hover:underline"> */}
              <h3 className="text-md font-semibold text-black">
                {book?.title}
              </h3>
              {/* </Link> */}

              <p className="text-xs text-gray-500 mb-1">by {book?.author}</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-5 py-2 bg-red-600 rounded-lg text-white hover:bg-red-600/80 cursor-pointer"
            >
              {isLoading ? "Deleting Book..." : "Delete Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;

import { BookOpen, Package, Users, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useBookStore } from "../store/bookStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [bookstatus, setBookstatus] = useState("");
  const [description, setDescription] = useState("");
  const { addBook, fetchBooks, error, isLoading, books } = useBookStore();

  // const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image || !title || !author || !price || !genre || !bookstatus) {
        toast.error("Please fill in required information");
        return;
      }

      const { message } = await addBook(
        image,
        title,
        author,
        price,
        genre,
        bookstatus,
        description
      );

      await fetchBooks();

      toast.success(message);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="mt-18 min-h-screen bg-cream-2 py-12 px-6 lg:px-30">
      <div className="flex flex-col gap-7">
        <h1 className="font-playflair text-3xl text-center font-bold pl-2 lg:text-start">
          Admin Dashboard
        </h1>
        <div className="flex items-center justify-center text-gray-1 lg:justify-start gap-6">
          <div className="flex justify-between items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
            <div>
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-medium">Books</span>
          </div>
          <div className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg cursor-pointer">
            <div>
              <Package className="h-4 w-4" />
            </div>
            <Link to="/admin/orders">
              <span className="font-medium">Orders</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Form to add book */}
        <div className="w-full bg-white rounded-xl shadow p-8 mt-10 lg:w-1/3">
          <div className="text-start">
            <h1 className="font-playflair font-medium mb-1 text-2xl">
              Add a new Book
            </h1>
            <p className="text-gray-1 text-sm">Add a new book to the store</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="block font-normal mb-2">Book Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block font-normal mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              />
            </div>
            <div>
              <label className="block font-normal mb-2">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              />
            </div>
            <div>
              <label className="block font-normal mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              />
            </div>
            <div className="flex gap-3">
              <div>
                <label className="block font-normal mb-2">Genre</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <label className="block font-normal mb-2">Status</label>
                <input
                  type="text"
                  value={bookstatus}
                  onChange={(e) => setBookstatus(e.target.value)}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-normal mb-2">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              ></textarea>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-brown-1 rounded-lg text-center text-white font-medium cursor-pointer"
            >
              {isLoading ? "Please Wait..." : "Add Book"}
            </button>
          </form>
        </div>

        {/* Book management table */}
        <div className="w-full bg-white rounded-xl shadow p-8 mt-10 lg:w-2/3">
          <div className="text-start">
            <h1 className="font-playflair font-medium mb-2 text-2xl">
              Book Management
            </h1>
            <p className="text-gray-1 text-sm">
              Manage your book inventory, {books.length} books in total.
            </p>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-md mt-8">
            <table className="min-w-full text-sm border-collapse">
              <thead className="text-gray-1">
                <tr>
                  <th className="px-4 py-3  text-left font-medium">Cover</th>
                  <th className="px-4 py-3  text-left font-medium">Title</th>
                  <th className="px-4 py-3  text-left font-medium">Author</th>
                  <th className="px-4 py-3  text-left font-medium">Price</th>
                  <th className="px-4 py-3  text-left font-medium">Status</th>
                  <th className="px-4 py-3  text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border-t border-gray-300">
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className="px-4 py-2">
                      <img
                        src={book.image}
                        alt="Cover"
                        className="h-16 w-12 object-cover  text-left rounded"
                      />
                    </td>
                    <td className="px-4 py-2  text-left font-medium">
                      {book.title}
                    </td>
                    <td className="px-4 py-2  text-left">{book.author}</td>
                    <td className="px-4 py-2  text-left">${book.price}</td>
                    <td className="px-4 py-2 text-left">
                      {book.bookstatus === "popular" ? (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white capitalize bg-burgandy rounded">
                          {book.bookstatus}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white capitalize bg-yellow rounded">
                          {book.bookstatus}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-2 mt-4 space-x-2 text-right flex gap-1 items-center justify-end">
                      <div className="p-3 bg-cream-2 rounded-md cursor-pointer">
                        <Link to={`/admin/book-edit/${book._id}`}>
                          <SquarePen className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="p-3 bg-red-500 text-white rounded-md cursor-pointer">
                        <Link to={`/admin/book-delete/${book._id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

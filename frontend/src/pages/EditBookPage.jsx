import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { book, isLoading, error, fetchBook, updateBook, message } =
    useBookStore();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    bookstatus: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id, fetchBook]);

  useEffect(() => {
    if (book && book._id === id) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        price: book.price?.toString() || "",
        genre: book.genre || "",
        bookstatus: book.bookstatus || "",
        description: book.description || "",
        image: book.image || "", // Store the original image URL
      });
    }
  }, [book, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };

    const result = await updateBook(id, dataToSubmit);

    if (result.success) {
      toast.success("Book is updated successfully.");
      setTimeout(() => {
        navigate(`/book/${id}`); // Or to admin book list
      }, 1500);
    }
  };

  if (error && !book) {
    // Error fetching initial book
    return (
      <div className="mt-20 container mx-auto p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="mt-18 min-h-screen bg-cream-2 py-12 px-6 lg:px-30">
      <div className="container mx-auto bg-white rounded-xl shadow p-8 mt-10">
        <div className="text-start">
          <h1 className="font-playflair font-medium mb-1 text-2xl">
            Edit Book
          </h1>
          {/* <p className="text-gray-1 text-sm">Add a new book to the store</p> */}
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
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
            />
          </div>
          <div>
            <label className="block font-normal mb-2">Author</label>
            <input
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
            />
          </div>
          <div>
            <label className="block font-normal mb-2">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
            />
          </div>
          <div className="flex justify-between lg:justify-start gap-12">
            <div>
              <label className="block font-normal mb-2">Genre</label>
              <input
                name="genre"
                type="text"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              />
            </div>
            <div>
              <label className="block font-normal mb-2">Status</label>
              <input
                name="status"
                type="text"
                value={formData.bookstatus}
                onChange={handleChange}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-normal mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;

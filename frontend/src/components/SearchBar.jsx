import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      // Navigate to search page with search term
      navigate(`/search?searchTerm=${encodeURIComponent(query)}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="relative w-115">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Books..."
          className="w-full p-2 border-gray-300 bg-cream-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-2"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 bottom-0 bg-[#695034] text-white font-medium px-4 p-2 rounded-r-md cursor-pointer"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;

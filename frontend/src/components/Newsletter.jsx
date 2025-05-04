import React from "react";
import { Bookmark } from "lucide-react";

const Newsletter = () => {
  return (
    <div className="bg-burgandy py-12 h-[45vh]">
      <div className="flex flex-col items-center justify-center gap-4">
        <Bookmark className="text-white w-12 h-12" />
        <h1 className="text-4xl font-bold  text-white font-playflair">
          Join Our Newsletter
        </h1>
        <p className="text-white text-center">
          Subscribe to get updates on new releases, exclusive discounts, and
          reading <br />
          recommendations.
        </p>
        <div>
          <form>
            <input
              type="email"
              className="w-115 p-2 border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-brown-2"
            />

            <button className="px-3 py-2 bg-yellow rounded-md ml-2">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

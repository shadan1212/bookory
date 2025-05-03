import { Facebook, Twitter, Instagram } from "lucide-react";
const Footer = () => {
  return (
    <div className="bg-brown-3  p-6 lg:px-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-white font-playflair">
            Bookory
          </h2>
          <p className="text-gray-300 leading-tight text-sm">
            Your trusted online bookstore with a vast <br /> selection of books
            across all genres.
          </p>
          <div className="flex items-center gap-6 mt-4">
            <Facebook className="text-gray-300" />
            <Twitter className="text-gray-300" />
            <Instagram className="text-gray-300" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-white font-playflair">
            Shop
          </h2>
          <span className="text-gray-300 text-sm">All Books</span>
          <span className="text-gray-300 text-sm">Featured</span>
          <span className="text-gray-300 text-sm">Bestsellers</span>
          <span className="text-gray-300 text-sm">New Releases</span>
          <span className="text-gray-300 text-sm">Special Offers</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-white font-playflair">
            Help
          </h2>
          <span className="text-gray-300 text-sm">Shopping</span>
          <span className="text-gray-300 text-sm">Returns</span>
          <span className="text-gray-300 text-sm">FAQs</span>
          <span className="text-gray-300 text-sm">Contact</span>
          <span className="text-gray-300 text-sm">Gift Cards</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium text-white font-playflair">
            About
          </h2>
          <span className="text-gray-300 text-sm">Our Story</span>
          <span className="text-gray-300 text-sm">Press</span>
          <span className="text-gray-300 text-sm">Blog</span>
          <span className="text-gray-300 text-sm">Careers</span>
          <span className="text-gray-300 text-sm">Privacy Policy</span>
        </div>
      </div>
      <div className="border-t-[0.3px] border-gray-400 mt-8">
        <p className="text-gray-300 text-center text-sm mt-6 mb-4">
          &copy; 2025 Bookory. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-brown-3 text-stone-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Brand Name */}
          <h2 className="text-3xl font-bold font-playflair">Bookory</h2>

          {/* Description */}
          <p className="mt-3 max-w-md text-stone-200">
            Your trusted online bookstore with a vast selection of books across
            all genres.
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="www.linkedin.com/in/mohammad-shadan-"
              className="text-stone-300 hover:text-stone-100 transition-colors duration-300"
            >
              <FaLinkedinIn className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/mshadan_"
              className="text-stone-300 hover:text-stone-100 transition-colors duration-300"
            >
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/shadan1212"
              className="text-stone-300 hover:text-stone-100 transition-colors duration-300"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-sm text-stone-200">
            &copy; 2025 Shadan | Bookory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

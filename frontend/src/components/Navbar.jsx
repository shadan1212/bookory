import React, { useState } from "react";
import { Menu, X, ShoppingCart, Book, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    navigate("/");
  };

  return (
    <nav
      className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]
       w-full fixed top-0 z-50 p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <div className="flex items-center gap-3 cursor-pointer">
            <Book className="text-burgandy h-10 w-10" />

            <span className="font-playflair text-brown-1 font-bold text-3xl">
              Bookory
            </span>
          </div>
        </Link>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        {!user && (
          <div className=" hidden md:flex justify-between items-center gap-10 cursor-pointer">
            <Link to={"/search"}>
              <span className="font-medium text-lg hover:bg-gray-100 px-5 py-3 rounded-lg">
                Browse
              </span>
            </Link>

            <div className=" hover:bg-gray-100 px-5 py-3 rounded-lg">
              <Link to={"/cart"}>
                <ShoppingCart />
              </Link>
            </div>
            <Link to={"/login"}>
              <button className="font-medium text-lg cursor-pointer hover:bg-gray-100 px-5 py-3 rounded-lg">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="bg-brown-2 hover:bg-brown-2/90 px-5 py-3 rounded-lg cursor-pointer text-white text-xl font-semibold">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* Role based rendering(Admin) */}
        {user && user.role === "admin" && (
          <div className="hidden md:flex justify-between items-center gap-10 cursor-pointer">
            <Link to={"/search"}>
              <span className="font-medium text-lg hover:bg-gray-100 px-5 py-3 rounded-lg">
                Browse
              </span>
            </Link>
            <div className="hover:bg-gray-100 px-5 py-3 rounded-lg">
              <Link to={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
            <Link to={"/admin"}>
              <div className="flex justify-between items-center gap-2 hover:bg-gray-100 px-5 py-3 rounded-lg">
                <div>
                  <User className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">Admin</span>
              </div>
            </Link>
            <div className=" hover:bg-gray-100 px-5 py-3 rounded-lg">
              <LogOut onClick={handleLogout} className="h-5 w-5" />
            </div>
          </div>
        )}

        {/* Role based rendering(User) */}
        {user && user.role === "user" && (
          <div className="hidden md:flex justify-between items-center gap-10 cursor-pointer">
            <Link to={"/search"}>
              <span className="font-medium text-lg hover:bg-gray-100 px-5 py-3 rounded-lg">
                Browse
              </span>
            </Link>
            <div className=" hover:bg-gray-100 px-5 py-3 rounded-lg">
              <Link to={"/cart"}>
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
            <Link to={"/user-profile"}>
              <div className="flex justify-center items-center gap-3 hover:bg-gray-100 px-5 py-3 rounded-lg">
                <div>
                  <User className="h-5 w-5" />
                </div>
                <span className="font-medium text-lg">Account</span>
              </div>
            </Link>
            <div className=" hover:bg-gray-100 px-5 py-3 rounded-lg">
              <LogOut onClick={handleLogout} className="h-5 w-5" />
            </div>
          </div>
        )}

        <div className="md:hidden">
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-lg min-h-screen mt-0 pt-5 px-4 flex flex-col space-y-6 font-normal cursor-pointer md:hidden" // Adjusted styling for dropdown appearance
        >
          {/* Search Bar for Mobile */}
          <div className="px-2 py-2 flex items-center justify-center">
            {" "}
            {/* Add some padding */}
            <SearchBar />
          </div>

          {/* Browse Link */}
          <Link
            to={"/search"}
            className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3"
          >
            {/* Consider adding an icon if desired */}
            Browse Books
          </Link>

          {/* Cart Link */}
          <Link
            to={"/cart"}
            className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>

          {/* Conditional Links based on Auth State */}
          {!user && (
            <>
              <Link
                to={"/login"}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user && user.role === "admin" && (
            <>
              <Link
                to={"/admin"}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3"
              >
                <User className="h-5 w-5" />
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3 text-left w-full" // Use button for action
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </>
          )}

          {/* User Links */}
          {user && user.role === "user" && (
            <>
              <Link
                to={"/user-profile"}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3"
              >
                <User className="h-5 w-5" />
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="text-xl hover:bg-gray-100 p-3 rounded-lg flex items-center gap-3 text-left w-full" // Use button for action
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

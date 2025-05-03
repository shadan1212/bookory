import React, { useState } from "react";
import { Menu, X, ShoppingCart, Book, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState("");
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
          <div className=" hidden md:flex justify-between items-center gap-10 cursor-pointer">
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
          <div className=" hidden md:flex justify-between items-center gap-10 cursor-pointer">
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
        <div className="md:hidden min-h-screen mt-16  px-4 flex flex-col space-y-8 font-normal cursor-pointer">
          <span className="text-2xl">Browse Books</span>
          <ShoppingCart />
          <span className="text-2xl">Login</span>
          <span className="text-2xl">Sign Up</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

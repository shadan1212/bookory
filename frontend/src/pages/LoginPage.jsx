import React, { useState } from "react";
import { Book } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { message } = await login(email, password);
      toast.success(message);
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="min-h-screen  bg-cream-2">
      <div className="flex flex-col space-y-6 items-center justify-center py-12">
        <Link to={"/"}>
          <div className="flex items-center gap-3 cursor-pointer">
            <Book className="text-burgandy h-10 w-10" />
            <span className="font-playflair text-brown-1 font-bold text-3xl">
              Bookory
            </span>
          </div>
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
          <div className="text-center">
            <h1 className="font-playflair font-medium mb-2 text-2xl">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-6">
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                placeholder="•••••••••"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-brown-1 rounded-lg text-center
             text-white font-medium cursor-pointer hover:bg-brown-1/90"
            >
              {isLoading ? "Please Wait.." : "Signin"}
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-burgandy">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { Book } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isaLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password must match");
        return;
      }

      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
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
              Create an Account
            </h1>
            <p className="text-gray-400">
              Enter your details to create your account
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6 mt-6">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                placeholder="John Doe"
              />
            </div>
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
            <div>
              <label className="block font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                placeholder="•••••••••"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={isaLoading}
              className="w-full p-3 bg-brown-1 rounded-lg text-center text-white font-medium cursor-pointer"
            >
              {isaLoading ? "Please Wait..." : "Create Account"}
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-burgandy">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

import {
  CircleUser,
  Package,
  LibraryBig,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const { user, updateProfile, error, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.street || "",
    city: user?.city || "",
    zip: user?.zip || "",
    country: user?.country || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile Updated");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="mt-18 bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-playflair text-3xl text-center font-bold pl-2 lg:text-start">
            My Account
          </h1>
          <p className="text-gray-1 text-center lg:text-start text-lg pl-2">
            Welcome back, {formData.username}
          </p>
        </div>

        <div className="flex items-center justify-center text-gray-1 lg:justify-start gap-6">
          <div className="flex justify-between items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <div>
              <CircleUser className="h-4 w-4" />
            </div>
            <span className="font-medium">Profile</span>
          </div>
          <div className="flex justify-between items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <div>
              <Package className="h-4 w-4" />
            </div>
            <span className="font-medium">Orders</span>
          </div>
          <div className="flex justify-between items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <div>
              <LibraryBig className="h-4 w-4" />
            </div>
            <span className="font-medium">My Books</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white shadow rounded-xl p-8 mt-10">
        <div>
          <h1 className="font-playflair font-medium mb-1 text-2xl">
            Profile Information
          </h1>
          <p className="text-gray-1 text-sm">
            Update your account information and address.
          </p>
        </div>

        {/* Update form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-4">
            <h2 className="font-playflair font-medium text-xl mb-6">
              Account Details
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Full Name</span>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Email</span>
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Phone</span>
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
            </div>

            <h2 className="font-playflair font-medium text-xl mb-6 mt-8">
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Street Address</span>
                </div>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium">City</span>
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Zip Code</span>
                </div>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Country</span>
                </div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border-gray-300 bg-cream-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-2"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-brown-1 rounded-lg text-center text-white font-medium cursor-pointer mt-8"
          >
            {isLoading ? "Please Wait..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;

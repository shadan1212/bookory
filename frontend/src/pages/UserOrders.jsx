import { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, Package } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const UserOrders = () => {
  const { user } = useAuthStore();
  const { orders, error, fetchUserOrders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md">
          Error loading orders: {error}
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mt-18 bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-playflair text-3xl text-center font-bold pl-2 lg:text-start">
              My Account, {user?.username}
            </h1>
            <p className="text-gray-1 text-center lg:text-start text-lg pl-2">
              Welcome back
            </p>
          </div>

          <div className="flex items-center justify-center text-gray-1 lg:justify-start gap-6">
            <div className="flex justify-between items-center gap-2  px-4 py-2 rounded-lg cursor-pointer">
              <div>
                <CircleUser className="h-4 w-4" />
              </div>
              <Link to="/user-profile">
                <span className="font-medium">Profile</span>
              </Link>
            </div>
            <div className="flex justify-between items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
              <div>
                <Package className="h-4 w-4" />
              </div>
              <span className="font-medium">Orders</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto h-[50vh] bg-white shadow rounded-xl p-8 mt-12">
          <div>
            <h1 className="font-playflair font-semibold mb-1 text-2xl">
              Your Orders
            </h1>
            <p className="text-gray-1 text">
              View and track your order history.
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center mt-8">
            <div>
              <Package className="h-12 w-12 text-gray-1" />
            </div>
            <p className="font-playflair text-lg font-medium">No orders yet</p>
            <p className="text-gray-1">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2 bg-brown-2 rounded-lg text-white font-semibold cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  console.log(user?.username);
  return (
    <div className="mt-18 bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-playflair text-3xl text-center font-bold pl-2 lg:text-start">
            My Account
          </h1>
          <p className="text-gray-1 text-center lg:text-start text-lg pl-2">
            Welcome back, {user?.username}
          </p>
        </div>

        <div className="flex items-center justify-center text-gray-1 lg:justify-start gap-6">
          <div className="flex justify-between items-center gap-2  px-4 py-2 rounded-lg cursor-pointer">
            <div>
              <CircleUser className="h-4 w-4" />
            </div>
            <Link to="/user-profile">
              <span className="font-medium">Profile</span>
            </Link>
          </div>
          <div className="flex justify-between items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
            <div>
              <Package className="h-4 w-4" />
            </div>
            <span className="font-medium">Orders</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white shadow rounded-xl p-8 mt-10">
        <div className="mb-4">
          <h1 className="font-playflair font-semibold mb-1 text-2xl">
            Your Orders
          </h1>
          <p className="text-gray-1 text">View and track your order history.</p>
        </div>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      Order ID:
                      <Link
                        to={`/orders/${order._id}`} // Link to a detailed order page
                        className="ml-2 text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {order._id}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      Total: $
                      {order.paymentInfo?.totalAmount?.toFixed(2) || "N/A"}
                    </p>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        order.status === "Delivered" ||
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped" ||
                            order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Cancelled" ||
                            order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700" // Placed, Pending etc.
                      }`}
                    >
                      Order Status: {order.status}
                    </span>
                    <span
                      className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        order.paymentInfo?.status === "Completed" ||
                        order.paymentInfo?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.paymentInfo?.status === "Refunded" ||
                            order.paymentInfo?.status === "refunded"
                          ? "bg-purple-100 text-purple-700"
                          : order.paymentInfo?.status === "Failed" ||
                            order.paymentInfo?.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700" // Pending etc.
                      }`}
                    >
                      Payment: {order.paymentInfo?.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-md font-semibold text-gray-600 mb-3">
                    Items ({order.items.length}):
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={item.book?._id || `item-${index}`}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50"
                      >
                        <img
                          src={
                            item.book?.image ||
                            "https://via.placeholder.com/60x90.png?text=No+Image"
                          }
                          alt={item.book?.title || "Book image"}
                          className="w-12 h-18 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-800">
                            {item.book?.title || "Book title not available"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity} | Price: $
                            {item.price?.toFixed(2) || "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
                <Link
                  to={`/orders/${order._id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderStore } from "../store/orderStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { order, fetchOrderById, cancelOrder, error } = useOrderStore();

  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  const handleCancelOrder = async () => {
    if (!order || !order._id) return;

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order? This action cannot be undone."
    );
    if (!confirmCancel) {
      return;
    }

    setIsCancelling(true);

    await cancelOrder(order._id);
    toast.success("Order cancelled successfully.");

    setIsCancelling(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="mt-20 container mx-auto p-6 text-center">
        <p className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md">
          Error loading order details: {error}
        </p>
        <Link
          to="/my-orders"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          &larr; Back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-xl text-gray-700">Order not found.</p>
        <Link
          to="/my-orders"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          &larr; Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-18 bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/user-profile/orders"
            className="text-gray-1 hover:underline text-sm"
          >
            &larr; Back to My Orders
          </Link>
        </div>

        {/* Order Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 border-b border-gray-200 pb-6 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Order Details
            </h1>
            <p className="text-sm text-gray-500">Order ID: {order._id}</p>
            <p className="text-sm text-gray-500">
              Placed on: {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg font-semibold text-gray-800 text-start">
              Total: ${order.paymentInfo?.totalAmount?.toFixed(2) || "N/A"}
            </p>
            <p className="text-sm text-start">
              <span className="font-medium">Order Status:</span>
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full
                ${
                  order.status === "Delivered" || order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped" || order.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Cancelled" ||
                      order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700" // Placed, Pending etc.
                }`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Payment Status:</span>
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full
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
                {order.paymentInfo?.status}
              </span>
            </p>
          </div>
          <div className="my-6 text-right">
            <button
              onClick={handleCancelOrder}
              disabled={isCancelling} // Disable if already cancelling or page is generally loading
              className={`px-6 py-2 font-medium rounded-md transition-colors cursor-pointer
                          ${
                            isCancelling
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300"
                          }`}
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Shipping Address
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{order.user?.name || "N/A"}</p>{" "}
              {/* Assuming user name is populated */}
              <p>{order.address?.street || "N/A"}</p>
              <p>
                {order.address?.city || "N/A"}, {order.address?.zip || "N/A"}
              </p>
              <p>{order.address?.country || "N/A"}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Payment Information
            </h2>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentInfo?.method?.replace("_", " ") || "N/A"}
              </p>
              {order.paymentInfo?.transactionId && (
                <p>
                  <span className="font-medium">Transaction ID:</span>{" "}
                  {order.paymentInfo.transactionId}
                </p>
              )}
              <p>
                <span className="font-medium">Total Amount:</span> $
                {order.paymentInfo?.totalAmount?.toFixed(2) || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Items Ordered ({order.items?.length || 0})
          </h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div
                key={item.book?._id || `item-${index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
              >
                <Link to={`/book/${item.book?._id}`} className="flex-shrink-0">
                  <img
                    src={
                      item.book?.image ||
                      "https://via.placeholder.com/80x120.png?text=No+Image"
                    }
                    alt={item.book?.title || "Book image"}
                    className="w-20 h-30 object-cover rounded border border-gray-200 hover:opacity-80 transition-opacity"
                  />
                </Link>
                <div className="flex-grow">
                  <Link
                    to={`/book/${item.book?._id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-md font-semibold text-blue-700">
                      {item.book?.title || "Book title not available"}
                    </h3>
                  </Link>
                  {item.book?.author && (
                    <p className="text-xs text-gray-500 mb-1">
                      by {item.book.author}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price per item: ${item.price?.toFixed(2) || "N/A"}{" "}
                    {/* This is price at time of order */}
                  </p>
                </div>
                <div className="text-sm sm:text-md font-semibold text-gray-800 sm:ml-auto pt-2 sm:pt-0">
                  Subtotal: ${(item.quantity * item.price).toFixed(2) || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

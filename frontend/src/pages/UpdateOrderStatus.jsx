import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderStore } from "../store/orderStore";
import { useState } from "react";
import { Link } from "react-router-dom";

// possible statuses based on the Order model
const ORDER_STATUSES = ["placed", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "completed", "failed", "refunded"];

const UpdateOrderStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { order, isLoading, error, fetchOrderById, updateOrderStatus } =
    useOrderStore();

  const [currentOrderStatus, setCurrentOrderStatus] = useState("");
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState("");
  const [transactionIdInput, setTransactionIdInput] = useState("");

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  useEffect(() => {
    if (order && order._id === id) {
      setCurrentOrderStatus(order?.status || "");
      setCurrentPaymentStatus(order.paymentInfo?.status || "");
      setTransactionIdInput(order.paymentInfo?.transactionId || "");
    }
  }, [order, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      status: currentOrderStatus, // Overall order status
      paymentStatus: currentPaymentStatus, // Payment-specific status
      transactionId:
        transactionIdInput.trim() === ""
          ? undefined
          : transactionIdInput.trim(), // Send undefined if empty, so it doesn't clear existing if not changed
    };
    // Remove undefined fields to avoid overwriting with nothing if not explicitly cleared
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    updateOrderStatus(id, updateData);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error && !order) {
    // Error fetching initial order
    return (
      <div className="mt-20 container mx-auto p-6 text-center">
        <p className="text-red-600 bg-red-100 border border-red-300 p-4 rounded-md mb-4">
          Error fetching order: {error}
        </p>
        <Link to="/admin/orders" className="text-blue-600 hover:underline">
          {" "}
          {/* Adjust admin orders list path */}
          &larr; Back to Orders List
        </Link>
      </div>
    );
  }

  if (!order) {
    // Order not found or not yet loaded, but no specific error for fetching
    return (
      <div className="mt-20 container mx-auto p-6 text-center">
        <p className="text-xl text-gray-700">
          Order not found or initial data not loaded.
        </p>
        <Link
          to="/admin/orders"
          className="mt-4 inline-block text-gray-1 hover:underline"
        >
          &larr; Back to Orders List
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-18 bg-cream-2 min-h-screen py-12 px-6 lg:px-30">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="mb-6">
          <Link
            to={`/order/${id}`}
            className="text-gray-1 hover:underline text-sm"
          >
            &larr; View Order Details
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Update Order
        </h1>
        <p className="text-sm text-gray-500 mb-6">Order ID: {order._id}</p>

        {/* Display Current Order Info */}
        <div className="mb-8 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Current Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-600">Placed on:</span>{" "}
              {formatDate(order.createdAt)}
            </p>
            <p>
              <span className="font-medium text-gray-600">Total Amount:</span> $
              {order.paymentInfo?.totalAmount?.toFixed(2)}
            </p>
            <p>
              <span className="font-medium text-gray-600">
                Current Order Status:
              </span>{" "}
              <span className="font-bold">{order.status}</span>
            </p>
            <p>
              <span className="font-medium text-gray-600">
                Current Payment Status:
              </span>{" "}
              <span className="font-bold">{order.paymentInfo?.status}</span>
            </p>
            {order.paymentInfo?.transactionId && (
              <p>
                <span className="font-medium text-gray-600">
                  Transaction ID:
                </span>{" "}
                {order.paymentInfo.transactionId}
              </p>
            )}
            <p>
              <span className="font-medium text-gray-600">Customer:</span>{" "}
              {order.user?.name || order.user?.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Form for Updating Order */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="orderStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Order Status
            </label>
            <select
              id="orderStatus"
              name="orderStatus"
              value={currentOrderStatus}
              onChange={(e) => setCurrentOrderStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="paymentStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Status
            </label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={currentPaymentStatus}
              onChange={(e) => setCurrentPaymentStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              {PAYMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Transaction ID (Optional)
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={transactionIdInput}
              onChange={(e) => setTransactionIdInput(e.target.value)}
              placeholder="Enter transaction ID if payment completed"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Messages for update operation */}
          {isLoading && message === null && (
            <p className="text-blue-600 text-sm">Updating order...</p>
          )}
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-md text-sm">
              Error updating: {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-brown-1 rounded-lg text-center text-white font-medium cursor-pointer mt-8"
            >
              {isLoading ? "Saving Changes..." : "Update Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;

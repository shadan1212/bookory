import Order from "../models/order.model.js";
import Book from "../models/book.model.js";

// place the order
const placeOrder = async (req, res) => {
  const { items, address, paymentInfo } = req.body;
  const user = req.user._id;

  if (!items || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Order must contain at least one item." });
  }

  if (!address || !paymentInfo) {
    return res
      .status(400)
      .json({ message: "Address and payment information are required." });
  }

  try {
    let calculatedTotalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res
          .status(404)
          .json({ message: `Book with ID ${item.book} not found.` });
      }

      orderItems.push({
        book: item.book,
        quantity: item.quantity,
        price: book.price,
      });
      calculatedTotalAmount += item.quantity * book.price;
    }

    const newOrder = await Order.create({
      user,
      items: orderItems,
      address,
      paymentInfo: {
        ...paymentInfo,
        totalAmount: calculatedTotalAmount,
        status: paymentInfo.status || "pending",
      },
      status: "placed",
    });

    res
      .status(201)
      .json({ message: "Order placed successfully.", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order.", error: error.message });
  }
};

// get all orders for the logged-in user
const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId })
      .populate("items.book", "title image price")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get orders for Admin:
const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.book", "title image price")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single order by Id
const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const user = req.user;

  try {
    const order = await Order.findById({ _id: orderId })
      .populate("user", "username email")
      .populate("items.book", "title image author price genre");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (
      order.user._id.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this order." });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status by Admin
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const { status, paymentStatus, transactionId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const updateFields = {};

    if (status) {
      updateFields.status = status;
    }
    if (paymentStatus) {
      updateFields["paymentInfo.status"] = paymentStatus;
    }
    if (transactionId) {
      updateFields["paymentInfo.transactionId"] = transactionId;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No update fields provided." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateFields },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.book", "title image price");

    res.status(200).json({
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel an order (by user or admin)
const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this order." });
    }

    // Conditions under which an order can be cancelled
    if (order.status === "delivered" || order.status === "shipped") {
      return res.status(400).json({
        message: `Order cannot be cancelled as it is already ${order.status}.`,
      });
    }
    if (order.status === "cancelled") {
      return res.status(400).json({ message: `Order is already cancelled.` });
    }

    order.status = "cancelled";
    // Potentially update payment status to "refunded" if applicable,
    // which might involve payment gateway logic.
    if (order.paymentInfo.status === "completed") {
      order.paymentInfo.status = "refunded"; // This is a simplification. Actual refund needs gateway interaction.
    }

    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order cancelled successfully.", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  placeOrder,
  getUserOrders,
  getAdminOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};

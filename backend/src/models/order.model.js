import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        book: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentInfo: {
      method: {
        type: String,
        required: true,
        enum: ["credit_card", "paypal", "bank_transfer"],
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
      transactionId: {
        type: String,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

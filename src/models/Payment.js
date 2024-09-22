import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      required: true,
      enum: ["Credit Card", "Debit Card", "PayPal", "Other"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
    },
    transactionId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

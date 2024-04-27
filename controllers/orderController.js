import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/OrderModel.js";
import AppError from "../utils/appError.js";

export const tryOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("error");
    }
    console.log(order);
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

export const createOrder = async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    products,
    user,
  } = req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  console.log("order post called");
  try {
    const data = req.body;
    console.log(data);
    const {
      user,
      products,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = data;
    const productItems = products.items.map((item) => ({
      product: item.itemId,
      quantity: item.quantity,
      price: item.price,
    }));
    console.log(productItems);
    const newOrder = new Order({
      user,
      products: productItems,
      billAmount: products.billAmount,
      totalQuantity: products.totalQuantity,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    return next(new AppError("Error saving orders to db", 500));
  }
  res.json({
    status: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    products,
    user,
  });
};

export const deleteOrder = (req, res, next) => {};
export const updateOrder = (req, res, next) => {};
export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user:  req.params.id });

    if (!order) {
      return next(new AppError("No orders found.", 404));
    }
    res.status(200).json({
      status: "successfully got the orders",
      order,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error getting the orders", 404));
  }
};

export const getAllOrders = (req, res, next) => {};

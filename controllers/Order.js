const Order = require("../Models/order");
const User = require("../Models/user");
const Product = require("../Models/product");
const order = require("../Models/order");

const getOrders = async (req, res, next) => {
  let order;

  try {
    if (req.user.role === "user" && req.user.role !== "admin") {
      order = await Order.find({ user: req.user.id })
        .populate("product")
        .populate("user");
    } else {
      order = await Order.find().populate("product").populate("user");
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("product")
      .populate("user");

    if (!order) {
      return res.status(400).json({
        success: false,
        data: `Not found order with id ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const createOrder = async (req, res, next) => {
  try {
    const user = req.user.id;
    const product = req.body.product;
    const amount = req.body.amount;

    let isProductExist = await Product.findById(product);

    if (!isProductExist) {
      return res.status(400).json({
        success: false,
        data: "Incorrect Product",
      });
    }

    if (amount > isProductExist.stock) {
      return res.status(400).json({
        success: false,
        data: "Amount is more than Product stock",
      });
    }

    const order = await Order.create({
      product,
      user,
      amount,
    });

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({
        success: false,
        data: `Not found order with id ${req.params.id}`,
      });
    }

    if (order.user !== req.user.id && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        data: `User can update only their own order`,
      });
    }

    const oldUser = order.user;
    req.body.user = oldUser;

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({
        success: false,
        data: `Not found order with id ${req.params.id}`,
      });
    }

    if (order.user !== req.user.id && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        data: `User can delete only their own order`,
      });
    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(400).json({
        success: false,
      });
  }
};

module.exports = { getOrder, getOrders , updateOrder , createOrder , deleteOrder };

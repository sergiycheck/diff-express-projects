const mongoose = require("mongoose");
const log = require("debug")("log");
const Product = require("../models/product");
const Order = require("../models/order");
const { ordersRoute } = require("../routes/routes.config");

exports.getListAllOrders = async (req, res, next) => {
  try {
    const orderDocs = await Order.find().select("product quantity").populate("product").exec();

    log(orderDocs);
    res.status(200).json({
      count: orderDocs.length,
      orders: orderDocs.map((doc) => ({
        product: doc.product,
        quantity: doc.quantity,
        _id: doc._id,
        request: {
          type: "GET",
          url: `${ordersRoute}/${doc._id}`,
        },
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.createNewOrder = async (req, res, next) => {
  const { productId } = req.body;
  try {
    const productFromDb = await Product.findById(productId);
    log("productFromDb ", productFromDb);

    if (!productFromDb) {
      res.status(404).json({
        message: `Product with id ${productId} was not found`,
      });
    }

    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: productId,
      quantity: req.body.quantity,
    });

    const createdOrder = await order.save();

    log("createdOrder", createdOrder);

    const { _id, product, quantity } = createdOrder;

    res.status(201).json({
      message: "Order was created!",
      createdOrder: { _id, product, quantity },
      request: {
        type: "GET",
        url: `${ordersRoute}/${createdOrder._id}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `An error occured while creating new order`,
      error,
    });
  }
};

exports.getOrderById = async (req, res, next) => {
  const id = req.params.orderId.trim();
  try {
    const orderDoc = await Order.findById(id)
      .select("product quantity _id")
      .populate({ path: "product", select: "_id name price" })
      .exec();

    if (orderDoc) {
      log(orderDoc);
      res.status(200).json({
        message: "Order was found",
        order: orderDoc,
        request: {
          type: "GET",
          description: "Get all orders",
          url: `${ordersRoute}`,
        },
      });
    } else {
      res.status(404).json({
        message: `order with id ${id} was not found`,
      });
    }
  } catch (error) {
    log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const deleteCount = await Order.deleteOne({ _id: orderId });
    res.status(200).json({
      message: "Order was deleted",
      deleteCount,
      request: {
        type: "POST",
        url: ordersRoute,
        data: { product: "ObjectId", quantity: "Number" },
      },
    });
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

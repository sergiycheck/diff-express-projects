const mongoose = require("mongoose");
const log = require("debug")("log");
const Product = require("../models/product");
const { productRoute } = require("../routes/routes.config");

exports.getListAllProducts = async (req, res, next) => {
  try {
    const productDocs = await Product.find().select("name price _id productImage").exec();

    log(productDocs);

    res.status(200).json({
      count: productDocs.length,
      products: productDocs.map((doc) => ({
        name: doc.name,
        price: doc.price,
        _id: doc._id,
        productImage: doc.productImage,
        request: {
          type: "GET",
          url: `${productRoute}/${doc._id}`,
        },
      })),
    });
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

exports.createProduct = async (req, res, next) => {
  log(req.file);

  const { name, price } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    productImage: req.file.path,
  });

  try {
    const createdProduct = await product.save();
    res.status(201).json({
      message: "Created product successfully",
      createdProduct: {
        name: createdProduct.name,
        price: createdProduct.price,
        _id: createdProduct._id,
        productImage: createdProduct.productImage,
      },
      request: {
        type: "GET",
        url: `${productRoute}/${createdProduct._id}`,
      },
    });
  } catch (error) {
    log(error);

    res.status(400).json({
      message: "error occured",
      error,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  const id = req.params.productId.trim();
  try {
    const document = await Product.findById(id).select("name price _id productImage").exec();
    if (document) {
      log(document);
      res.status(200).json({
        message: "Product was found",
        product: document,
        request: {
          type: "GET",
          description: "Get all products",
          url: `${productRoute}`,
        },
      });
    } else {
      res.status(404).json({
        message: `product with id ${id} was not found`,
      });
    }
  } catch (error) {
    log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { name, price } = req.body;
  try {
    const updatedResult = await Product.updateOne({ _id: productId }, { name, price });
    res.status(200).json({
      message: "Product updated",
      updatedResult,
      request: {
        type: "GET",
        url: `${productRoute}/${productId}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deleteResult = await Product.deleteOne({ _id: productId });
    res.status(200).json({
      message: "Product was deleted",
      deleteCount: deleteResult.deletedCount,
      request: {
        type: "POST",
        url: productRoute,
        data: { name: "String", price: "Number" },
      },
    });
  } catch (error) {
    log(error);
    res.status(500).json(error);
  }
};

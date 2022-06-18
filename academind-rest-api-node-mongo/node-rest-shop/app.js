const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

const { productRoute, ordersRoute, usersRoute } = require("./api/routes/routes.config");

mongoose.connect(
  `mongodb+srv://node-shop-nlwkef12fe:${process.env.MONGO_ATLAS_PW}@node-rest-shop.g1mue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(
  // create application/x-www-form-urlencoded parser
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());

// Routes which should handle requests
app.use(productRoute, productRoutes);
app.use(ordersRoute, orderRoutes);
app.use(usersRoute, userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

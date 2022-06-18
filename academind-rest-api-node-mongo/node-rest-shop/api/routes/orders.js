const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

router.get("/", OrdersController.getListAllOrders);

router.post("/", checkAuth, OrdersController.createNewOrder);

router.get("/:orderId", OrdersController.getOrderById);

router.delete("/:orderId", checkAuth, OrdersController.deleteOrder);

module.exports = router;

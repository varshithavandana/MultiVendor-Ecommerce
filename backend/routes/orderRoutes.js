const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

router.post("/place", placeOrder);

router.get("/user/:userId", getOrders);

router.get("/", getAllOrders);

router.put("/update/:id", updateOrderStatus);

module.exports = router;
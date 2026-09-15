const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} = require("../controllers/orderController");


// Place Order
router.post("/place", placeOrder);


// Get Orders of a User
router.get("/user/:userId", getOrders);


// Get All Orders
router.get("/", getAllOrders);


// Update Order Status
router.put("/update/:id", updateOrderStatus);


// Cancel Order
router.put("/cancel/:orderId", cancelOrder);


module.exports = router;
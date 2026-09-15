const express = require("express");
const router = express.Router();

const {
    getVendorOrders,
    updateVendorOrderStatus,
    getVendorDashboard
} = require("../controllers/vendorController");

router.get("/dashboard/:vendorId", getVendorDashboard);

router.get("/orders/:vendorId", getVendorOrders);

router.put("/orders/status/:orderId", updateVendorOrderStatus);

module.exports = router;
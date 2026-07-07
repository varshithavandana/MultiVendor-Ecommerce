const express = require("express");

const router = express.Router();

const {
    getVendorOrders
} = require("../controllers/vendorController");

router.get("/orders/:vendorId", getVendorOrders);

module.exports = router;
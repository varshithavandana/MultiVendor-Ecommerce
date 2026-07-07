const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getVendorProducts
} = require("../controllers/productController");

// Product Routes

router.post("/add", addProduct);

router.get("/", getProducts);

// Vendor Products (Keep this before /:id)
router.get("/vendor/:vendorId", getVendorProducts);

router.get("/:id", getProductById);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
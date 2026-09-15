const express = require("express");
const router = express.Router();

const multer = require("multer");

const {
    addProduct,
    getProducts,
    getProductById,
    getVendorProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// ================= IMAGE UPLOAD =================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ================= ROUTES =================

router.post("/add", upload.single("image"), addProduct);

router.get("/", getProducts);

router.get("/vendor/:vendorId", getVendorProducts);

router.get("/:id", getProductById);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
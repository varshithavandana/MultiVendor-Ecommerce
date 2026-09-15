const express = require("express");

const router = express.Router();

const {
    dashboard,
    getUsers,
    deleteUser,
    getProducts,
    deleteProduct,
    getOrders,
    updateOrderStatus
} = require("../controllers/adminController");


// ================= DASHBOARD =================

router.get("/dashboard", dashboard);


// ================= USERS =================

router.get("/users", getUsers);

router.delete("/users/:id", deleteUser);


// ================= PRODUCTS =================

router.get("/products", getProducts);

router.delete("/products/:id", deleteProduct);


// ================= ORDERS =================

router.get("/orders", getOrders);

router.put("/orders/status/:orderId", updateOrderStatus);


module.exports = router;
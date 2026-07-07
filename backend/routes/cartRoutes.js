const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
} = require("../controllers/cartController");

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.delete("/remove/:id", removeFromCart);

router.put("/increase/:id", increaseQuantity);

router.put("/decrease/:id", decreaseQuantity);

module.exports = router;
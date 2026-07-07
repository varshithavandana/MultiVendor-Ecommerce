const db = require("../config/db");

// ================= ADD TO CART =================
const addToCart = (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({
            message: "User ID and Product ID are required"
        });
    }

    db.query(
        "SELECT stock FROM products WHERE id=?",
        [product_id],
        (err, productResult) => {

            if (err) return res.status(500).json(err);

            if (productResult.length === 0) {
                return res.status(404).json({
                    message: "Product Not Found"
                });
            }

            const stock = productResult[0].stock;

            db.query(
                "SELECT * FROM cart WHERE user_id=? AND product_id=?",
                [user_id, product_id],
                (err, cartResult) => {

                    if (err) return res.status(500).json(err);

                    if (cartResult.length > 0) {

                        const newQuantity =
                            cartResult[0].quantity + (quantity || 1);

                        if (newQuantity > stock) {
                            return res.status(400).json({
                                message: `Only ${stock} items available in stock`
                            });
                        }

                        db.query(
                            "UPDATE cart SET quantity=? WHERE id=?",
                            [newQuantity, cartResult[0].id],
                            (err) => {

                                if (err)
                                    return res.status(500).json(err);

                                res.json({
                                    message: "Cart Updated Successfully"
                                });

                            }
                        );

                    } else {

                        if ((quantity || 1) > stock) {
                            return res.status(400).json({
                                message: `Only ${stock} items available in stock`
                            });
                        }

                        db.query(
                            "INSERT INTO cart(user_id, product_id, quantity) VALUES(?,?,?)",
                            [user_id, product_id, quantity || 1],
                            (err) => {

                                if (err)
                                    return res.status(500).json(err);

                                res.status(201).json({
                                    message: "Product Added To Cart"
                                });

                            }
                        );

                    }

                }
            );

        }
    );

};

// ================= GET CART =================
const getCart = (req, res) => {

    const { userId } = req.params;

    const sql = `
        SELECT
            cart.id,
            products.name,
            products.price,
            products.image,
            cart.quantity
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

// ================= REMOVE ITEM =================
const removeFromCart = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM cart WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Item Removed From Cart"
            });

        }
    );

};

// ================= INCREASE QUANTITY =================
const increaseQuantity = (req, res) => {

    const { id } = req.params;

    db.query(
        "UPDATE cart SET quantity = quantity + 1 WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Quantity Increased"
            });

        }
    );

};

// ================= DECREASE QUANTITY =================
const decreaseQuantity = (req, res) => {

    const { id } = req.params;

    db.query(
        "UPDATE cart SET quantity = quantity - 1 WHERE id=? AND quantity > 1",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Quantity Decreased"
            });

        }
    );

};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
};
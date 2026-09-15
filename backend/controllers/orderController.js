const db = require("../config/db");

// ================= PLACE ORDER =================
const placeOrder = (req, res) => {

    const {
        user_id,
        total_amount,
        payment_method
    } = req.body;

    if (!user_id || !total_amount) {
        return res.status(400).json({
            message: "User ID and Total Amount are required"
        });
    }

    // Get products from customer's cart
    const cartSql = `
        SELECT
            cart.product_id,
            cart.quantity,
            products.price
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    `;

    db.query(cartSql, [user_id], (err, cartItems) => {

        if (err) {
            console.log("CART ERROR:", err);
            return res.status(500).json(err);
        }

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // Create Order
        db.query(
            `INSERT INTO orders(user_id, total_amount, payment_method)
             VALUES(?,?,?)`,
            [
                user_id,
                total_amount,
                payment_method || "Cash On Delivery"
            ],
            (err, result) => {

                if (err) {
                    console.log("ORDER ERROR:", err);
                    return res.status(500).json(err);
                }

                const orderId = result.insertId;

                // Insert every cart product into order_items
                let completed = 0;

                cartItems.forEach((item) => {

                    db.query(
                        `INSERT INTO order_items
                        (order_id, product_id, quantity, price)
                        VALUES(?,?,?,?)`,
                        [
                            orderId,
                            item.product_id,
                            item.quantity,
                            item.price
                        ],
                        (err) => {

                            if (err) {
                                console.log("ORDER ITEM ERROR:", err);
                                return res.status(500).json(err);
                            }

                            completed++;

                            // After all products are inserted
                            if (completed === cartItems.length) {

                                // Clear cart
                                db.query(
                                    "DELETE FROM cart WHERE user_id=?",
                                    [user_id],
                                    (err2) => {

                                        if (err2) {
                                            return res.status(500).json(err2);
                                        }

                                        res.status(201).json({
                                            message: "Order Placed Successfully",
                                            orderId: orderId
                                        });

                                    }
                                );
                            }

                        }
                    );

                });

            }
        );

    });

};


// ================= GET USER ORDERS =================
const getOrders = (req, res) => {

    const { userId } = req.params;

    db.query(
        `SELECT *
         FROM orders
         WHERE user_id=?
         ORDER BY created_at DESC`,
        [userId],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};


// ================= GET ALL ORDERS =================
const getAllOrders = (req, res) => {

    db.query(
        `SELECT
            orders.*,
            users.name
         FROM orders
         JOIN users
         ON orders.user_id = users.id
         ORDER BY orders.created_at DESC`,
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};


// ================= UPDATE STATUS =================
const updateOrderStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    db.query(
        "UPDATE orders SET status=? WHERE id=?",
        [status, id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Order Status Updated"
            });

        }
    );

};


// ================= CANCEL ORDER =================
const cancelOrder = (req, res) => {

    const { orderId } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({
            message: "User ID is required"
        });
    }

    // Customer can cancel only their own Pending order
    const sql = `
        UPDATE orders
        SET status='cancelled'
        WHERE id=?
        AND user_id=?
        AND LOWER(status)='pending'
    `;

    db.query(
        sql,
        [orderId, user_id],
        (err, result) => {

            if (err) {
                console.log("CANCEL ORDER ERROR:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({
                    message: "Order cannot be cancelled"
                });
            }

            res.json({
                message: "Order Cancelled Successfully"
            });

        }
    );

};


// ================= EXPORT =================
module.exports = {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
};
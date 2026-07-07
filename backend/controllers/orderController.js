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

    db.query(
        `INSERT INTO orders(user_id, total_amount, payment_method)
         VALUES(?,?,?)`,
        [
            user_id,
            total_amount,
            payment_method || "Cash On Delivery"
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            // Clear Cart after successful order
            db.query(
                "DELETE FROM cart WHERE user_id=?",
                [user_id],
                (err2) => {

                    if (err2)
                        return res.status(500).json(err2);

                    res.status(201).json({
                        message: "Order Placed Successfully",
                        orderId: result.insertId
                    });

                }
            );

        }
    );

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

            if (err)
                return res.status(500).json(err);

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

            if (err)
                return res.status(500).json(err);

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

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Order Status Updated"
            });

        }
    );

};

module.exports = {
    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus
};
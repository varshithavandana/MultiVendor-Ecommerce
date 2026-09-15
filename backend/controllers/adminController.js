const db = require("../config/db");

// ================= DASHBOARD STATISTICS =================

const dashboard = (req, res) => {

    const data = {};

    db.query("SELECT COUNT(*) AS users FROM users", (err, users) => {

        if (err) return res.status(500).json(err);

        data.users = users[0].users;

        db.query("SELECT COUNT(*) AS products FROM products", (err, products) => {

            if (err) return res.status(500).json(err);

            data.products = products[0].products;

            db.query("SELECT COUNT(*) AS orders FROM orders", (err, orders) => {

                if (err) return res.status(500).json(err);

                data.orders = orders[0].orders;

                db.query(
                    "SELECT SUM(total_amount) AS revenue FROM orders",
                    (err, revenue) => {

                        if (err) return res.status(500).json(err);

                        data.revenue = revenue[0].revenue || 0;

                        res.json(data);
                    }
                );

            });

        });

    });

};


// ================= GET ALL USERS =================

const getUsers = (req, res) => {

    db.query(
        "SELECT id, name, email, phone, role FROM users ORDER BY id DESC",
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

};


// ================= DELETE USER =================

const deleteUser = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "User Not Found"
                });

            }

            res.json({
                message: "User Deleted Successfully"
            });

        }
    );

};


// ================= GET ALL PRODUCTS =================

const getProducts = (req, res) => {

    const sql = `
        SELECT
            products.id,
            products.name,
            products.description,
            products.price,
            products.stock,
            products.category,
            products.image,
            products.vendor_id,
            users.name AS vendor_name
        FROM products
        LEFT JOIN users
        ON products.vendor_id = users.id
        ORDER BY products.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// ================= DELETE PRODUCT =================

const deleteProduct = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM products WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Product Not Found"
                });

            }

            res.json({
                message: "Product Deleted Successfully"
            });

        }
    );

};


// ================= GET ALL ORDERS =================

const getOrders = (req, res) => {

    const sql = `
        SELECT
            orders.id AS order_id,
            users.name AS customer_name,
            orders.total_amount,
            orders.payment_method,
            orders.status,
            orders.created_at
        FROM orders
        LEFT JOIN users
        ON orders.user_id = users.id
        ORDER BY orders.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = (req, res) => {

    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {

        return res.status(400).json({
            message: "Status is required"
        });

    }

    db.query(
        "UPDATE orders SET status=? WHERE id=?",
        [status, orderId],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Order Not Found"
                });

            }

            res.json({
                message: "Order Status Updated Successfully"
            });

        }
    );

};


// ================= EXPORT =================

module.exports = {
    dashboard,
    getUsers,
    deleteUser,
    getProducts,
    deleteProduct,
    getOrders,
    updateOrderStatus
};
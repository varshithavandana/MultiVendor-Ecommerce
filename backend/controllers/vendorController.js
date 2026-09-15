const db = require("../config/db");

// ================= VENDOR ORDERS =================
const getVendorOrders = (req, res) => {
    const { vendorId } = req.params;

    const sql = `
        SELECT
            orders.id AS order_id,
            orders.total_amount,
            orders.status,
            products.name,
            products.price,
            products.vendor_id
        FROM orders
        JOIN order_items
            ON orders.id = order_items.order_id
        JOIN products
            ON order_items.product_id = products.id
        WHERE products.vendor_id = ?
        ORDER BY orders.id DESC
    `;

    db.query(sql, [vendorId], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
};


// ================= UPDATE VENDOR ORDER STATUS =================
const updateVendorOrderStatus = (req, res) => {

    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    const sql = `
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, orderId], (err, result) => {

        if (err) {
            console.log("STATUS UPDATE ERROR:", err);
            return res.status(500).json({
                message: "Failed to update order status",
                error: err
            });
        }

        console.log(
            "Order updated:",
            orderId,
            "Status:",
            status,
            "Rows:",
            result.affectedRows
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order Status Updated Successfully"
        });
    });
};


// ================= VENDOR DASHBOARD =================
const getVendorDashboard = (req, res) => {

    const { vendorId } = req.params;

    const data = {
        products: 0,
        orders: 0,
        revenue: 0
    };

    db.query(
        "SELECT COUNT(*) AS products FROM products WHERE vendor_id=?",
        [vendorId],
        (err, products) => {

            if (err) {
                return res.status(500).json(err);
            }

            data.products = products[0].products;

            const orderSql = `
                SELECT COUNT(DISTINCT orders.id) AS orders
                FROM orders
                JOIN order_items
                    ON orders.id = order_items.order_id
                JOIN products
                    ON order_items.product_id = products.id
                WHERE products.vendor_id = ?
            `;

            db.query(orderSql, [vendorId], (err, orders) => {

                if (err) {
                    return res.status(500).json(err);
                }

                data.orders = orders[0].orders;

                const revenueSql = `
                    SELECT
                        SUM(order_items.quantity * order_items.price) AS revenue
                    FROM order_items
                    JOIN products
                        ON order_items.product_id = products.id
                    WHERE products.vendor_id = ?
                `;

                db.query(revenueSql, [vendorId], (err, revenue) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    data.revenue = revenue[0].revenue || 0;

                    res.json(data);
                });
            });
        }
    );
};


module.exports = {
    getVendorOrders,
    updateVendorOrderStatus,
    getVendorDashboard
};
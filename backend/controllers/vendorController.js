const db = require("../config/db");

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
    JOIN order_items ON orders.id = order_items.order_id
    JOIN products ON order_items.product_id = products.id
    WHERE products.vendor_id = ?
    `;

    db.query(sql, [vendorId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

module.exports = {
    getVendorOrders
};
const db = require("../config/db");

// Dashboard Statistics
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

                db.query("SELECT SUM(total_amount) AS revenue FROM orders", (err, revenue) => {
                    if (err) return res.status(500).json(err);

                    data.revenue = revenue[0].revenue || 0;

                    res.json(data);
                });

            });

        });

    });

};

module.exports = {
    dashboard
};
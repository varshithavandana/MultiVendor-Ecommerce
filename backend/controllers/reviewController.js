const db = require("../config/db");

// ADD REVIEW
const addReview = (req, res) => {
    const { order_id, user_id, rating, review } = req.body;

    if (!order_id || !user_id || !rating) {
        return res.status(400).json({
            message: "Order ID, User ID and Rating are required"
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    const sql = `
        INSERT INTO reviews
        (order_id, user_id, rating, review)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [order_id, user_id, rating, review || null],
        (err, result) => {
            if (err) {
                console.log("REVIEW ERROR:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Review Submitted Successfully",
                reviewId: result.insertId
            });
        }
    );
};

module.exports = {
    addReview
};
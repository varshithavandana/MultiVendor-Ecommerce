const db = require("../config/db");

// Add to Wishlist
const addWishlist = (req, res) => {

    const { user_id, product_id } = req.body;

    db.query(
        "INSERT INTO wishlist(user_id,product_id) VALUES(?,?)",
        [user_id, product_id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Added to Wishlist",
                id: result.insertId
            });

        }
    );

};

// Get Wishlist
const getWishlist = (req, res) => {

    const { userId } = req.params;

    const sql = `
    SELECT wishlist.id,
           products.name,
           products.price,
           products.image
    FROM wishlist
    JOIN products
    ON wishlist.product_id = products.id
    WHERE wishlist.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

// Remove Wishlist Item
const removeWishlist = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM wishlist WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Wishlist Item Removed"
            });

        }
    );

};

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist,
};
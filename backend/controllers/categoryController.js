const db = require("../config/db");

// Add Category
const addCategory = (req, res) => {

    const { name } = req.body;

    db.query(
        "INSERT INTO categories(name) VALUES(?)",
        [name],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Category Added Successfully",
                id: result.insertId
            });

        }
    );

};

// Get Categories
const getCategories = (req, res) => {

    db.query(
        "SELECT * FROM categories",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

module.exports = {
    addCategory,
    getCategories
};
const db = require("../config/db");

// ================= ADD PRODUCT =================
const addProduct = (req, res) => {

    console.log("BODY:", req.body);

    const {
        name,
        description,
        price,
        stock,
        category,
        vendor_id
    } = req.body;

    if (!name || !price || !vendor_id) {
        return res.status(400).json({
            message: "Name, Price and Vendor ID are required"
        });
    }

    const image = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO products
        (name, description, price, stock, category, image, vendor_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            description,
            price,
            stock,
            category,
            image,
            vendor_id
        ],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Product Added Successfully",
                productId: result.insertId,
                image
            });

        }
    );
};

// ================= GET ALL PRODUCTS =================
const getProducts = (req, res) => {

    db.query("SELECT * FROM products", (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.status(200).json(result);

    });

};

// ================= GET PRODUCT BY ID =================
const getProductById = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Product Not Found"
                });
            }

            res.status(200).json(result[0]);

        }
    );

};

// ================= UPDATE PRODUCT =================
const updateProduct = (req, res) => {

    const { id } = req.params;

const {
    name,
    description,
    price,
    stock,
    category,
    vendor_id
} = req.body || {};
    db.query(
        `UPDATE products
        SET name=?, description=?, price=?, stock=?, category=?
        WHERE id=?`,
        [
            name,
            description,
            price,
            stock,
            category,
            id
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Product Updated Successfully"
            });

        }
    );

};

// ================= DELETE PRODUCT =================
const deleteProduct = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM products WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Product Deleted Successfully"
            });

        }
    );

};

// ================= GET PRODUCTS OF A VENDOR =================
const getVendorProducts = (req, res) => {

    const { vendorId } = req.params;

    db.query(
        "SELECT * FROM products WHERE vendor_id=?",
        [vendorId],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(200).json(result);

        }
    );

};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getVendorProducts
};
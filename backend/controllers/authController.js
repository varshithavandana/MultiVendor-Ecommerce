const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                // Hash Password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert User
                db.query(
                    "INSERT INTO users(name,email,password,phone,role) VALUES(?,?,?,?,?)",
                    [name, email, hashedPassword, phone, role],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};

// ================= LOGIN =================
const login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );

};

module.exports = {
    register,
    login
};
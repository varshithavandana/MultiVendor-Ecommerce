import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "customer"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const register = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/auth/register", form);

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Register
                        </h2>

                        <form onSubmit={register}>

                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Role</label>

                                <select
                                    className="form-select"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                            </div>

                            <button
                                className="btn btn-success w-100"
                                type="submit"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/">Login</Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;
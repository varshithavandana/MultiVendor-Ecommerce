import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", form);

            alert(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/home");

        } catch (err) {

            alert(err.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Don't have an account?

                            <Link to="/register">
                                Register
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;
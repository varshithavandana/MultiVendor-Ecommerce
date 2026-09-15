import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Products() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleImageChange = (e) => {

        setForm({
            ...form,
            image: e.target.files[0]
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            formData.append("category", form.category);
            formData.append("vendor_id", user.id);

            if (form.image) {
                formData.append("image", form.image);
            }

            const res = await api.post(
                "/products/add",
                formData
            );

            alert(res.data.message);

            navigate("/vendor");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }
    };

    return (
        <>
            <Navbar />

            <div
                className="container py-5"
                style={{
                    minHeight: "100vh",
                    background: "#f8f9fa"
                }}
            >

                <div className="row justify-content-center">

                    <div className="col-md-7">

                        <div className="card shadow border-0">

                            <div className="card-body p-4">

                                <h2 className="text-center fw-bold mb-4">
                                    ➕ Add New Product
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    {/* PRODUCT NAME */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter product name"
                                            required
                                        />

                                    </div>

                                    {/* DESCRIPTION */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Enter product description"
                                        />

                                    </div>

                                    {/* PRICE + STOCK */}

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                value={form.price}
                                                onChange={handleChange}
                                                placeholder="Enter price"
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Stock
                                            </label>

                                            <input
                                                type="number"
                                                name="stock"
                                                className="form-control"
                                                value={form.stock}
                                                onChange={handleChange}
                                                placeholder="Enter stock"
                                                required
                                            />

                                        </div>

                                    </div>

                                    {/* CATEGORY */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            className="form-select"
                                            value={form.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            <option value="electronics">
                                                💻 Electronics
                                            </option>

                                            <option value="mobiles">
                                                📱 Mobiles
                                            </option>

                                            <option value="fashion">
                                                👕 Fashion
                                            </option>

                                            <option value="furniture">
                                                🪑 Furniture
                                            </option>

                                            <option value="grocery">
                                                🛒 Grocery
                                            </option>

                                        </select>

                                    </div>

                                    {/* IMAGE */}

                                    <div className="mb-4">

                                        <label className="form-label">
                                            Product Image
                                        </label>

                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        {form.image && (
                                            <p className="text-success mt-2">
                                                ✅ {form.image.name}
                                            </p>
                                        )}

                                    </div>

                                    {/* BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        ➕ Add Product
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Products;
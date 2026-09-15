import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function VendorDashboard() {
    const [data, setData] = useState({
        products: 0,
        orders: 0,
        revenue: 0
    });

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const [editingProduct, setEditingProduct] = useState(null);

    const [editForm, setEditForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });

    useEffect(() => {
        loadDashboard();
        loadProducts();
        loadOrders();
    }, []);

    // ================= DASHBOARD =================

    const loadDashboard = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(
                `/vendor/dashboard/${user.id}`
            );

            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= PRODUCTS =================

    const loadProducts = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(
                `/products/vendor/${user.id}`
            );

            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= ORDERS =================

    const loadOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(
                `/vendor/orders/${user.id}`
            );

            setOrders(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= EDIT PRODUCT =================

    const startEdit = (product) => {
        setEditingProduct(product.id);

        setEditForm({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            category: product.category || ""
        });
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const updateProduct = async (id) => {
        try {
            const res = await api.put(
                `/products/update/${id}`,
                editForm
            );

            alert(res.data.message);

            setEditingProduct(null);

            loadProducts();
            loadDashboard();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update product"
            );
        }
    };

    // ================= DELETE PRODUCT =================

    const deleteProduct = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this product?"
            )
        ) {
            return;
        }

        try {

            const res = await api.delete(
                `/products/delete/${id}`
            );

            alert(res.data.message);

            loadProducts();
            loadDashboard();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        }
    };

    // ================= UPDATE ORDER STATUS =================

    const updateOrderStatus = async (orderId, status) => {

        try {

            const res = await api.put(
                `/vendor/orders/status/${orderId}`,
                {
                    status: status
                }
            );

            alert(res.data.message);

            loadOrders();
            loadDashboard();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
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

                {/* ================= TITLE ================= */}

                <h2 className="fw-bold mb-5">
                    🏪 Vendor Dashboard
                </h2>


                {/* ================= STATISTICS ================= */}

                <div className="row mb-5">

                    <div className="col-md-4 mb-3">

                        <div className="card shadow border-0 text-center p-4">

                            <h2>🛍️</h2>

                            <h2 className="text-primary">
                                {data.products}
                            </h2>

                            <p className="mb-0">
                                My Products
                            </p>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="card shadow border-0 text-center p-4">

                            <h2>📦</h2>

                            <h2 className="text-success">
                                {data.orders}
                            </h2>

                            <p className="mb-0">
                                My Orders
                            </p>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="card shadow border-0 text-center p-4">

                            <h2>💰</h2>

                            <h2 className="text-warning">
                                ₹ {data.revenue}
                            </h2>

                            <p className="mb-0">
                                My Revenue
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= MY PRODUCTS ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h3>
                                🛍️ My Products
                            </h3>

                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    window.location.href = "/products";
                                }}
                            >
                                ➕ Add Product
                            </button>

                        </div>


                        {products.length === 0 ? (

                            <p className="text-muted">
                                No products found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>ID</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>


                                    <tbody>

                                        {products.map((product) => (

                                            <tr key={product.id}>

                                                <td>
                                                    {product.id}
                                                </td>


                                                {/* PRODUCT */}

                                                <td>

                                                    {editingProduct === product.id ? (

                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            value={editForm.name}
                                                            onChange={handleEditChange}
                                                        />

                                                    ) : (

                                                        product.name

                                                    )}

                                                </td>


                                                {/* PRICE */}

                                                <td>

                                                    {editingProduct === product.id ? (

                                                        <input
                                                            type="number"
                                                            name="price"
                                                            className="form-control"
                                                            value={editForm.price}
                                                            onChange={handleEditChange}
                                                        />

                                                    ) : (

                                                        `₹ ${product.price}`

                                                    )}

                                                </td>


                                                {/* STOCK */}

                                                <td>

                                                    {editingProduct === product.id ? (

                                                        <input
                                                            type="number"
                                                            name="stock"
                                                            className="form-control"
                                                            value={editForm.stock}
                                                            onChange={handleEditChange}
                                                        />

                                                    ) : (

                                                        product.stock

                                                    )}

                                                </td>


                                                {/* CATEGORY */}

                                                <td>

                                                    {editingProduct === product.id ? (

                                                        <input
                                                            type="text"
                                                            name="category"
                                                            className="form-control"
                                                            value={editForm.category}
                                                            onChange={handleEditChange}
                                                        />

                                                    ) : (

                                                        product.category

                                                    )}

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    {editingProduct === product.id ? (

                                                        <>

                                                            <button
                                                                className="btn btn-success btn-sm me-2"
                                                                onClick={() =>
                                                                    updateProduct(product.id)
                                                                }
                                                            >
                                                                💾 Save
                                                            </button>


                                                            <button
                                                                className="btn btn-secondary btn-sm"
                                                                onClick={() =>
                                                                    setEditingProduct(null)
                                                                }
                                                            >
                                                                Cancel
                                                            </button>

                                                        </>

                                                    ) : (

                                                        <>

                                                            <button
                                                                className="btn btn-warning btn-sm me-2"
                                                                onClick={() =>
                                                                    startEdit(product)
                                                                }
                                                            >
                                                                ✏️ Edit
                                                            </button>


                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    deleteProduct(product.id)
                                                                }
                                                            >
                                                                🗑️ Delete
                                                            </button>

                                                        </>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ================= MY ORDERS ================= */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        <h3 className="mb-4">
                            📦 My Orders
                        </h3>


                        {orders.length === 0 ? (

                            <p className="text-muted">
                                No orders found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>Order ID</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>

                                    </thead>


                                    <tbody>

                                        {orders.map((item, index) => (

                                            <tr key={index}>

                                                <td>
                                                    #{item.order_id}
                                                </td>

                                                <td>
                                                    {item.name}
                                                </td>

                                                <td>
                                                    ₹ {item.price}
                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        value={
                                                            item.status
                                                                ?.toLowerCase() ||
                                                            "pending"
                                                        }
                                                        onChange={(e) =>
                                                            updateOrderStatus(
                                                                item.order_id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="pending">
                                                            Pending
                                                        </option>

                                                        <option value="shipped">
                                                            Shipped
                                                        </option>

                                                        <option value="delivered">
                                                            Delivered
                                                        </option>

                                                        <option value="cancelled">
                                                            Cancelled
                                                        </option>

                                                    </select>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default VendorDashboard;
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {

    const [data, setData] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0
    });

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadUsers();
        loadProducts();
        loadOrders();
    }, []);


    // ================= DASHBOARD =================

    const loadDashboard = async () => {

        try {

            const res = await api.get("/admin/dashboard");

            setData(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ================= USERS =================

    const loadUsers = async () => {

        try {

            const res = await api.get("/admin/users");

            setUsers(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ================= PRODUCTS =================

    const loadProducts = async () => {

        try {

            const res = await api.get("/admin/products");

            setProducts(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ================= ORDERS =================

    const loadOrders = async () => {

        try {

            const res = await api.get("/admin/orders");

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ================= DELETE USER =================

    const deleteUser = async (id) => {

        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {

            const res = await api.delete(`/admin/users/${id}`);

            alert(res.data.message);

            loadUsers();
            loadDashboard();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };


    // ================= DELETE PRODUCT =================

    const deleteProduct = async (id) => {

        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {

            const res = await api.delete(`/admin/products/${id}`);

            alert(res.data.message);

            loadProducts();
            loadDashboard();

        } catch (error) {

            console.log(error);

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
                `/admin/orders/status/${orderId}`,
                {
                    status: status
                }
            );

            alert(res.data.message);

            loadOrders();

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

                <h2 className="text-center fw-bold mb-5">
                    📊 Admin Dashboard
                </h2>


                {/* ================= STATISTICS ================= */}

                <div className="row mb-5">

                    <div className="col-md-3 mb-4">

                        <div className="card text-center shadow border-0 p-4">

                            <h2>👥</h2>

                            <h3 className="text-primary">
                                {data.users}
                            </h3>

                            <p className="mb-0">
                                Total Users
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3 mb-4">

                        <div className="card text-center shadow border-0 p-4">

                            <h2>🛍️</h2>

                            <h3 className="text-success">
                                {data.products}
                            </h3>

                            <p className="mb-0">
                                Total Products
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3 mb-4">

                        <div className="card text-center shadow border-0 p-4">

                            <h2>📦</h2>

                            <h3 className="text-warning">
                                {data.orders}
                            </h3>

                            <p className="mb-0">
                                Total Orders
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3 mb-4">

                        <div className="card text-center shadow border-0 p-4">

                            <h2>💰</h2>

                            <h3 className="text-danger">
                                ₹ {data.revenue}
                            </h3>

                            <p className="mb-0">
                                Total Revenue
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= MANAGE USERS ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-body">

                        <h3 className="fw-bold mb-4">
                            👥 Manage Users
                        </h3>

                        {users.length === 0 ? (

                            <p className="text-muted">
                                No users found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {users.map((user) => (

                                            <tr key={user.id}>

                                                <td>{user.id}</td>

                                                <td>{user.name}</td>

                                                <td>{user.email}</td>

                                                <td>
                                                    {user.phone || "N/A"}
                                                </td>

                                                <td>

                                                    {user.role === "admin" && (
                                                        <span className="badge bg-danger">
                                                            👑 Admin
                                                        </span>
                                                    )}

                                                    {user.role === "vendor" && (
                                                        <span className="badge bg-warning text-dark">
                                                            🏪 Vendor
                                                        </span>
                                                    )}

                                                    {user.role === "customer" && (
                                                        <span className="badge bg-primary">
                                                            🛒 Customer
                                                        </span>
                                                    )}

                                                </td>

                                                <td>

                                                    {user.role === "admin" ? (

                                                        <span className="text-muted">
                                                            Protected
                                                        </span>

                                                    ) : (

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                deleteUser(user.id)
                                                            }
                                                        >
                                                            🗑️ Delete
                                                        </button>

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


                {/* ================= MANAGE PRODUCTS ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-body">

                        <h3 className="fw-bold mb-4">
                            🛍️ Manage Products
                        </h3>

                        {products.length === 0 ? (

                            <p className="text-muted">
                                No products found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>ID</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Category</th>
                                            <th>Vendor</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {products.map((product) => (

                                            <tr key={product.id}>

                                                <td>{product.id}</td>

                                                <td>{product.name}</td>

                                                <td>
                                                    ₹ {product.price}
                                                </td>

                                                <td>
                                                    {product.stock}
                                                </td>

                                                <td>
                                                    {product.category}
                                                </td>

                                                <td>
                                                    {product.vendor_name || "N/A"}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            deleteProduct(product.id)
                                                        }
                                                    >
                                                        🗑️ Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ================= MANAGE ORDERS ================= */}

                <div className="card shadow border-0">

                    <div className="card-body">

                        <h3 className="fw-bold mb-4">
                            📦 Manage Orders
                        </h3>

                        {orders.length === 0 ? (

                            <p className="text-muted">
                                No orders found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Payment</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {orders.map((order) => (

                                            <tr key={order.order_id}>

                                                <td>
                                                    #{order.order_id}
                                                </td>

                                                <td>
                                                    {order.customer_name || "N/A"}
                                                </td>

                                                <td>
                                                    ₹ {order.total_amount}
                                                </td>

                                                <td>
                                                    {order.payment_method || "Cash On Delivery"}
                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        value={
                                                            order.status?.toLowerCase() ||
                                                            "pending"
                                                        }
                                                        onChange={(e) =>
                                                            updateOrderStatus(
                                                                order.order_id,
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

                                                <td>
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
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

export default AdminDashboard;
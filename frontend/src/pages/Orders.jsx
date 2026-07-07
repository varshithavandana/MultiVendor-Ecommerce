import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(`/orders/user/${user.id}`);

            setOrders(res.data);

        } catch (error) {

            console.log(error);

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

                <h2 className="fw-bold mb-4">
                    📦 My Orders
                </h2>

                {orders.length === 0 ? (

                    <div className="text-center mt-5">

                        <h3>No Orders Yet 😔</h3>

                        <p className="text-muted">
                            Start shopping and place your first order.
                        </p>

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order.id}
                            className="card shadow-sm border-0 mb-4"
                            style={{
                                borderRadius: "15px"
                            }}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between">

                                    <h4>
                                        📦 Order #{order.id}
                                    </h4>

                                    <span
                                        className="badge bg-warning text-dark"
                                        style={{
                                            fontSize: "15px",
                                            padding: "10px"
                                        }}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                <hr />

                                <div className="row">

                                    <div className="col-md-6">

                                        <p>
                                            💰 <strong>Total :</strong> ₹ {order.total_amount}
                                        </p>

                                        <p>
                                            💳 <strong>Payment :</strong>{" "}
                                            {order.payment_method}
                                        </p>

                                    </div>

                                    <div className="col-md-6">

                                        <p>
                                            📅 <strong>Date :</strong>{" "}
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>

                                        <p>
                                            🚚 <strong>Status :</strong>{" "}
                                            {order.status}
                                        </p>

                                    </div>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <span className="text-success fw-bold">
                                        ✔ Order Confirmed
                                    </span>

                                    <button className="btn btn-outline-primary">
                                        ⭐ Rate Order
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </>

    );

}

export default Orders;
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {

    const [orders, setOrders] = useState([]);

    // Rating popup
    const [showRating, setShowRating] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");


    useEffect(() => {
        loadOrders();
    }, []);


    // ================= LOAD ORDERS =================
    const loadOrders = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(`/orders/user/${user.id}`);

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // ================= CANCEL ORDER =================
    const cancelOrder = async (orderId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.put(
                `/orders/cancel/${orderId}`,
                {
                    user_id: user.id
                }
            );

            alert(res.data.message);

            loadOrders();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to cancel order"
            );

        }

    };


    // ================= OPEN RATING =================
    const openRating = (order) => {

        setSelectedOrder(order);
        setRating(0);
        setReview("");
        setShowRating(true);

    };


    // ================= SUBMIT RATING =================
    const submitRating = () => {

        if (rating === 0) {

            alert("Please select a rating");

            return;
        }

        alert(
            `Thank you for rating Order #${selectedOrder.id} ⭐ ${rating}/5`
        );

        // Close popup
        setShowRating(false);

        setSelectedOrder(null);
        setRating(0);
        setReview("");

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


                                {/* ORDER HEADER */}

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4>
                                        📦 Order #{order.id}
                                    </h4>


                                    <span
                                        className={`badge ${
                                            order.status?.toLowerCase() === "cancelled"
                                                ? "bg-danger"
                                                : order.status?.toLowerCase() === "delivered"
                                                ? "bg-success"
                                                : order.status?.toLowerCase() === "shipped"
                                                ? "bg-primary"
                                                : "bg-warning text-dark"
                                        }`}
                                        style={{
                                            fontSize: "15px",
                                            padding: "10px"
                                        }}
                                    >
                                        {order.status}
                                    </span>

                                </div>


                                <hr />


                                {/* ORDER DETAILS */}

                                <div className="row">

                                    <div className="col-md-6">

                                        <p>
                                            💰 <strong>Total :</strong>{" "}
                                            ₹ {order.total_amount}
                                        </p>

                                        <p>
                                            💳 <strong>Payment :</strong>{" "}
                                            {order.payment_method || "Cash On Delivery"}
                                        </p>

                                    </div>


                                    <div className="col-md-6">

                                        <p>
                                            📅 <strong>Date :</strong>{" "}
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                        </p>

                                        <p>
                                            🚚 <strong>Status :</strong>{" "}
                                            {order.status}
                                        </p>

                                    </div>

                                </div>


                                <hr />


                                {/* BOTTOM SECTION */}

                                <div className="d-flex justify-content-between align-items-center">


                                    {/* STATUS MESSAGE */}

                                    {order.status?.toLowerCase() === "cancelled" ? (

                                        <span className="text-danger fw-bold">
                                            ❌ Order Cancelled
                                        </span>

                                    ) : order.status?.toLowerCase() === "delivered" ? (

                                        <span className="text-success fw-bold">
                                            ✔ Order Delivered
                                        </span>

                                    ) : order.status?.toLowerCase() === "shipped" ? (

                                        <span className="text-primary fw-bold">
                                            🚚 Order Shipped
                                        </span>

                                    ) : (

                                        <span className="text-success fw-bold">
                                            ✔ Order Confirmed
                                        </span>

                                    )}


                                    <div>


                                        {/* CANCEL BUTTON */}

                                        {order.status?.toLowerCase() === "pending" && (

                                            <button
                                                className="btn btn-danger me-2"
                                                onClick={() =>
                                                    cancelOrder(order.id)
                                                }
                                            >
                                                ❌ Cancel Order
                                            </button>

                                        )}


                                        {/* RATE BUTTON */}

                                        {order.status?.toLowerCase() === "delivered" && (

                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    openRating(order)
                                                }
                                            >
                                                ⭐ Rate Order
                                            </button>

                                        )}

                                    </div>


                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>


            {/* ================= RATING POPUP ================= */}

            {showRating && (

                <div
                    className="modal d-block"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title">
                                    ⭐ Rate Your Order
                                </h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setShowRating(false)}
                                >
                                </button>

                            </div>


                            <div className="modal-body text-center">

                                <h5 className="mb-3">
                                    Order #{selectedOrder?.id}
                                </h5>


                                {/* STARS */}

                                <div className="mb-4">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            key={star}
                                            type="button"
                                            className="btn"
                                            style={{
                                                fontSize: "35px",
                                                color:
                                                    star <= rating
                                                        ? "#ffc107"
                                                        : "#ccc"
                                            }}
                                            onClick={() =>
                                                setRating(star)
                                            }
                                        >
                                            ★
                                        </button>

                                    ))}

                                </div>


                                {/* REVIEW */}

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Write your review (optional)"
                                    value={review}
                                    onChange={(e) =>
                                        setReview(e.target.value)
                                    }
                                />

                            </div>


                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowRating(false)
                                    }
                                >
                                    Close
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={submitRating}
                                >
                                    Submit Rating
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default Orders;
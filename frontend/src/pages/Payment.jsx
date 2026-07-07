import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Payment() {

    const navigate = useNavigate();

    const total = localStorage.getItem("total");

    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

    const [upiId, setUpiId] = useState("");

    const [cardNumber, setCardNumber] = useState("");

    const [expiry, setExpiry] = useState("");

    const [cvv, setCvv] = useState("");

    const payNow = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            await api.post("/orders/place", {

                user_id: user.id,
                total_amount: total,
                payment_method: paymentMethod

            });

            alert("✅ Payment Successful!\n\nOrder Placed Successfully.");

            navigate("/orders");

        } catch (error) {

            alert(error.response?.data?.message || "Payment Failed");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div
                    className="card shadow p-4 mx-auto"
                    style={{
                        maxWidth: "600px",
                        borderRadius: "15px"
                    }}
                >

                    <h2 className="text-center mb-4">
                        💳 Payment
                    </h2>

                    <h4 className="text-success text-center mb-4">
                        Total Amount : ₹ {total}
                    </h4>

                    <label className="form-label">
                        Select Payment Method
                    </label>

                    <select
                        className="form-select mb-4"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                        <option>Cash On Delivery</option>

                        <option>UPI</option>

                        <option>Credit/Debit Card</option>

                    </select>

                    {paymentMethod === "UPI" && (

                        <input
                            className="form-control mb-3"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />

                    )}

                    {paymentMethod === "Credit/Debit Card" && (

                        <>

                            <input
                                className="form-control mb-3"
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Expiry (MM/YY)"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="CVV"
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />

                        </>

                    )}

                    <button
                        className="btn btn-success btn-lg w-100 mt-3"
                        onClick={payNow}
                    >
                        ✅ Proceed To Pay
                    </button>

                </div>

            </div>

        </>

    );

}

export default Payment;
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(`/cart/${user.id}`);

console.log(res.data);

setCart(res.data);

            

        } catch (error) {

            console.log(error);

        }

    };

    const placeOrder = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.post("/orders/place", {
                user_id: user.id,
                total_amount: total
            });

            alert(res.data.message);

            loadCart();

            window.location.href = "/orders";

        } catch (error) {

            alert(error.response?.data?.message || "Failed To Place Order");

        }

    };

    const removeItem = async (id) => {

        try {

            await api.delete(`/cart/remove/${id}`);

            alert("Item Removed");

            loadCart();

        } catch (error) {

            alert("Failed To Remove Item");

        }

    };

    const increaseQuantity = async (id) => {

        try {

            await api.put(`/cart/increase/${id}`);

            loadCart();

        } catch (error) {

            alert("Failed To Increase Quantity");

        }

    };

    const decreaseQuantity = async (id) => {

        try {

            await api.put(`/cart/decrease/${id}`);

            loadCart();

        } catch (error) {

            alert("Failed To Decrease Quantity");

        }

    };

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

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

                <h2 className="mb-4 fw-bold">
                    🛒 My Shopping Cart
                </h2>

                {cart.length === 0 ? (

                    <div className="text-center mt-5">

                        <h3>Your Cart is Empty 😔</h3>

                        <p className="text-muted">
                            Start shopping to add products.
                        </p>

                    </div>

                ) : (

                    <div className="row">

                        {/* Cart Items */}

                        <div className="col-lg-8">

                            {cart.map((item) => (

                                <div
                                    key={item.id}
                                    className="card shadow-sm mb-4 border-0"
                                    style={{
                                        borderRadius: "15px"
                                    }}
                                >

                                    <div className="row g-0">

                                        <div className="col-md-4">

                                            <img
                                                src={`/images/${item.image}`}
                                                alt={item.name}
                                                className="img-fluid"
                                                style={{
                                                    height: "230px",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: "15px 0 0 15px"
                                                }}
                                            />

                                        </div>

                                        <div className="col-md-8">

                                            <div className="card-body">

                                                <h3>{item.name}</h3>

                                                <h4 className="text-success">
                                                    ₹ {item.price}
                                                </h4>

                                                <div className="d-flex align-items-center my-3">

                                                    <strong className="me-3">
                                                        Quantity
                                                    </strong>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                    >
                                                        ➖
                                                    </button>

                                                    <span
                                                        className="mx-3 fw-bold"
                                                        style={{ fontSize: "18px" }}
                                                    >
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => increaseQuantity(item.id)}
                                                    >
                                                        ➕
                                                    </button>

                                                </div>

                                                <h5>
                                                    Subtotal :
                                                    <span className="text-primary">
                                                        {" "}₹ {item.price * item.quantity}
                                                    </span>
                                                </h5>

                                                <button
                                                    className="btn btn-danger mt-3"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    🗑 Remove
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* Order Summary */}

                        <div className="col-lg-4">

                            <div
                                className="card shadow border-0"
                                style={{
                                    borderRadius: "15px"
                                }}
                            >

                                <div className="card-body">

                                    <h3 className="mb-4">
                                        📋 Order Summary
                                    </h3>

                                    <p>
                                        Items
                                        <span className="float-end">
                                            {cart.length}
                                        </span>
                                    </p>

                                    <p>
                                        Delivery
                                        <span className="float-end text-success">
                                            FREE
                                        </span>
                                    </p>

                                    <hr />

                                    <h4>
                                        Grand Total
                                        <span className="float-end text-primary">
                                            ₹ {total}
                                        </span>
                                    </h4>

                                    <button
    className="btn btn-success w-100 mt-4"
    onClick={() => {
        localStorage.setItem("total", total);
        window.location.href = "/payment";
    }}
>
    💳 Proceed To Payment
</button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </>

    );

}

export default Cart;
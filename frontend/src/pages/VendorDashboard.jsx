import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function VendorDashboard() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(`/vendor/orders/${user.id}`);

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    🏪 Vendor Dashboard
                </h2>

                {orders.length === 0 ? (

                    <h4>No Orders Found</h4>

                ) : (

                    <table className="table table-bordered">

                        <thead>

                            <tr>

                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map((item) => (

                                <tr key={item.order_id}>

                                    <td>{item.order_id}</td>

                                    <td>{item.name}</td>

                                    <td>₹ {item.price}</td>

                                    <td>{item.status}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </>

    );

}

export default VendorDashboard;
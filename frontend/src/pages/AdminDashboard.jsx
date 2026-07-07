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

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/admin/dashboard");

            setData(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-center mb-5">
                    📊 Admin Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-3 mb-4">
                        <div className="card text-center shadow p-4">
                            <h3>{data.users}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card text-center shadow p-4">
                            <h3>{data.products}</h3>
                            <p>Total Products</p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card text-center shadow p-4">
                            <h3>{data.orders}</h3>
                            <p>Total Orders</p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card text-center shadow p-4">
                            <h3>₹ {data.revenue}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;
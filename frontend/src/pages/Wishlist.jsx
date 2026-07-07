import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.get(`/wishlist/${user.id}`);

            setWishlist(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const removeWishlist = async (id) => {

        try {

            await api.delete(`/wishlist/remove/${id}`);

            alert("Item Removed From Wishlist");

            loadWishlist();

        } catch (error) {

            alert("Failed To Remove Item");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    ❤️ My Wishlist
                </h2>

                {wishlist.length === 0 ? (

                    <h4>Your Wishlist is Empty</h4>

                ) : (

                    <div className="row">

                        {wishlist.map((item) => (

                            <div
                                className="col-md-4 mb-4"
                                key={item.id}
                            >

                                <div className="card shadow p-3">

                                    <h4>{item.name}</h4>

                                    <h5>₹ {item.price}</h5>

                                    <button
                                        className="btn btn-danger mt-2"
                                        onClick={() => removeWishlist(item.id)}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>

    );

}

export default Wishlist;
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const res = await api.get("/products");
            setProducts(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addToCart = async (productId) => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.post("/cart/add", {
                user_id: user.id,
                product_id: productId,
                quantity: 1
            });

            alert(res.data.message);

        } catch (error) {

            alert(error.response?.data?.message || "Something went wrong");

        }

    };

    const addWishlist = async (productId) => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const res = await api.post("/wishlist/add", {
                user_id: user.id,
                product_id: productId
            });

            alert(res.data.message);

        } catch (error) {

            alert(error.response?.data?.message || "Failed To Add Wishlist");

        }

    };

    return (

        <>
            <Navbar />

            <div
                style={{
                    background: "linear-gradient(135deg,#eef5ff,#ffffff)",
                    minHeight: "100vh"
                }}
            >

                <div className="container py-5">

                    <div className="text-center mb-5">

                        <h1
                            className="fw-bold"
                            style={{
                                fontSize: "48px",
                                color: "#0d6efd"
                            }}
                        >
                            🛍 Multi Vendor Store
                        </h1>

                        <p
                            className="text-muted"
                            style={{
                                fontSize: "20px"
                            }}
                        >
                            Discover the Best Deals on Electronics, Fashion,
                            Furniture & Grocery
                        </p>

                    </div>

                    <div className="row justify-content-center mb-5">

                        <div className="col-lg-8 mb-3">

                            <input
                                type="text"
                                className="form-control form-control-lg shadow"
                                placeholder="🔍 Search Products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    borderRadius: "30px"
                                }}
                            />

                        </div>

                        <div className="col-lg-4">

                            <select
                                className="form-select form-select-lg shadow"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{
                                    borderRadius: "30px"
                                }}
                            >
                                <option value="All">📦 All Categories</option>
                                <option value="electronics">💻 Electronics</option>
                                <option value="mobiles">📱 Mobiles</option>
                                <option value="fashion">👕 Fashion</option>
                                <option value="furniture">🪑 Furniture</option>
                                <option value="grocery">🛒 Grocery</option>
                            </select>

                        </div>

                    </div>

                    <div className="row">

                        {products
                            .filter((product) =>
                                product.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .filter((product) =>
                                category === "All"
                                    ? true
                                    : product.category.toLowerCase() === category.toLowerCase()
                            )
                            .map((product) => (

                                <div
                                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                                    key={product.id}
                                >

                                    <ProductCard
                                        product={product}
                                        addToCart={addToCart}
                                        addWishlist={addWishlist}
                                    />

                                </div>

                            ))}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Home;
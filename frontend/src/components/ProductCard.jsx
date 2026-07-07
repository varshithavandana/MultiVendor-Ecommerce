import { Card, Button, Badge } from "react-bootstrap";

function ProductCard({ product, addToCart, addWishlist }) {

    return (

        <Card
            className="border-0 shadow-sm h-100"
            style={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: "0.3s",
                cursor: "pointer"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
            }}
        >

            {/* Product Image */}

            <div style={{ position: "relative" }}>

                <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover"
                    }}
                />


            </div>

            <Card.Body className="d-flex flex-column">

                <Card.Title
                    className="text-center fw-bold"
                    style={{ fontSize: "20px" }}
                >
                    {product.name}
                </Card.Title>

                <Card.Text
                    className="text-muted text-center"
                    style={{ minHeight: "50px" }}
                >
                    {product.description}
                </Card.Text>

                {/* Rating */}

                <div className="text-center mb-2">

                    ⭐⭐⭐⭐⭐

                    <span className="ms-2 text-success fw-bold">
                        4.8
                    </span>

                </div>

                {/* Price */}

                <h4
                    className="text-center"
                    style={{
                        color: "#198754",
                        fontWeight: "bold"
                    }}
                >
                    ₹ {product.price}
                </h4>

                {/* Category */}

                <p className="text-center mb-1">

                    📂 <strong>{product.category}</strong>

                </p>

                {/* Stock */}

                <div className="text-center mb-3">

                   

                </div>

                <div className="mt-auto d-grid gap-2">

                    <Button
                        variant="primary"
                        style={{
                            borderRadius: "30px",
                            fontWeight: "bold"
                        }}
                        onClick={() => addToCart(product.id)}
                    >
                        🛒 Add To Cart
                    </Button>

                    <Button
                        variant="outline-danger"
                        style={{
                            borderRadius: "30px",
                            fontWeight: "bold"
                        }}
                        onClick={() => addWishlist(product.id)}
                    >
                        ❤️ Wishlist
                    </Button>

                </div>

            </Card.Body>

        </Card>

    );

}

export default ProductCard;
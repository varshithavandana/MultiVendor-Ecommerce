import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

function CustomNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <Navbar
            expand="lg"
            style={{
                background: "linear-gradient(to right, #0d6efd, #4f8dfd)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}
            variant="dark"
            sticky="top"
        >

            <Container>

                <Navbar.Brand
                    as={Link}
                    to="/home"
                    className="fw-bold"
                    style={{ fontSize: "26px" }}
                >
                    🛍 MultiVendor Store
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="me-auto ms-4">

                        <Nav.Link
                            as={Link}
                            to="/home"
                            active={location.pathname === "/home"}
                        >
                            🏠 Home
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/cart"
                            active={location.pathname === "/cart"}
                        >
                            🛒 Cart
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/wishlist"
                            active={location.pathname === "/wishlist"}
                        >
                            ❤️ Wishlist
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/orders"
                            active={location.pathname === "/orders"}
                        >
                            📦 Orders
                        </Nav.Link>

                    </Nav>

                    <span
                        className="text-white fw-bold me-3"
                        style={{ fontSize: "17px" }}
                    >
                        👋 Welcome, {user?.name}
                    </span>

                    <Button
                        variant="light"
                        style={{
                            borderRadius: "25px",
                            padding: "8px 20px",
                            fontWeight: "bold"
                        }}
                        onClick={logout}
                    >
                        🚪 Logout
                    </Button>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

}

export default CustomNavbar;
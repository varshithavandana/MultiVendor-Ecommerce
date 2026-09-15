import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function CustomNavbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>

                <Navbar.Brand as={Link} to="/home">
                    🛍 MultiVendor
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/cart">
                            Cart
                        </Nav.Link>

                        <Nav.Link as={Link} to="/wishlist">
                            Wishlist
                        </Nav.Link>

                        <Nav.Link as={Link} to="/orders">
                            Orders
                        </Nav.Link>

                        {/* ADMIN LINK */}
                        {user?.role === "admin" && (
                            <Nav.Link as={Link} to="/admin">
                                👑 Admin
                            </Nav.Link>
                        )}

                        {/* VENDOR LINK */}
                        {user?.role === "vendor" && (
                            <Nav.Link as={Link} to="/vendor">
                                🏪 Vendor
                            </Nav.Link>
                        )}

                    </Nav>

                    <span className="text-light me-3">
                        👋 {user?.name}
                    </span>

                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
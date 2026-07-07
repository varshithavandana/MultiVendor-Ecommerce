import { Container, Row, Col } from "react-bootstrap";

function Footer() {

    return (

        <footer
            style={{
                background: "#1f2937",
                color: "white",
                marginTop: "60px",
                padding: "50px 0 20px"
            }}
        >

            <Container>

                <Row>

                    <Col md={6}>

                        <h3 className="fw-bold">
                            🛍 MultiVendor Store
                        </h3>

                        <p className="mt-3">
                            Your trusted destination for Electronics,
                            Fashion, Furniture & Grocery.
                        </p>

                    </Col>

                    <Col md={6}>

                        <h4>Contact Us</h4>

                        <p>📧 support@multivendor.com</p>

                        <p>📞 +91 9876543210</p>

                        <p>📍 Hyderabad, India</p>

                        <h5 className="mt-4">
                            Follow Us
                        </h5>

                        <div style={{ fontSize: "28px" }}>
                            📘 &nbsp;
                            📷 &nbsp;
                            💼 &nbsp;
                            🐦
                        </div>

                    </Col>

                </Row>

                <hr style={{ borderColor: "#555" }} />

                <p className="text-center mb-0">
                    © 2026 MultiVendor Store. All Rights Reserved.
                </p>

            </Container>

        </footer>

    );

}

export default Footer;
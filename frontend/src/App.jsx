import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC PAGES */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* HOME - ALL LOGGED IN USERS */}

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "customer"
                            ]}
                        >
                            <Home />
                        </ProtectedRoute>
                    }
                />


                {/* CART */}

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "customer"
                            ]}
                        >
                            <Cart />
                        </ProtectedRoute>
                    }
                />


                {/* WISHLIST */}

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "customer"
                            ]}
                        >
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />


                {/* ORDERS */}

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute
                            allowedRoles={[
                                "admin",
                                "vendor",
                                "customer"
                            ]}
                        >
                            <Orders />
                        </ProtectedRoute>
                    }
                />


                {/* VENDOR - ONLY VENDOR */}

                <Route
                    path="/vendor"
                    element={
                        <ProtectedRoute
                            allowedRoles={["vendor"]}
                        >
                            <VendorDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* ADD PRODUCT - ONLY VENDOR */}

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute
                            allowedRoles={["vendor"]}
                        >
                            <Products />
                        </ProtectedRoute>
                    }
                />


                {/* ADMIN - ONLY ADMIN */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            allowedRoles={["admin"]}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;
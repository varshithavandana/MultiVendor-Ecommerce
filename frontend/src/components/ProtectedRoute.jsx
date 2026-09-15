import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    // Wrong role
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute;
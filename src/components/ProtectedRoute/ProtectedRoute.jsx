import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({ children, allowedRoles}) => {
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to="/login" replace/>;   
    } 

    try {
        const decoded = jwtDecode(token);
        if (!allowedRoles.includes(decoded.role)) {
            return <Navigate to="/dashboard" replace />
        }
        return children
    } catch (error) {
        return <Navigate to="/login" replace/>
    }
};

export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = ({ isAuthenticated, children, adminRoute }) => {
    const { loading, user } = useSelector((state) => state.user);
    if (!loading && isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    // if (!loading && user.role !== "admin") {
    //     return <Navigate to="/account" />;
    // }
    // if (adminRoute === true && user.role !== "admin") {
    //     return <Navigate to="/account" />;
    // }
    // if (adminRoute === true) {
    //     return <Navigate to="/account" />;
    // }


    return (

        children ? children : <Outlet />


    );
}
export default ProtectedRoute
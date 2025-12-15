import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authProvider";

export function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return null;
    }

    if(!user){
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if(roles.length > 0 && !roles.includes(user.rol)){
        return <Navigate to="/" replace />;
    }

    return children;
}
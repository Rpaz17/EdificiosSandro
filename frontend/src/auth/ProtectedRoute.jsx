import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if(loading){
        return null;
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }

    if(roles && roles.length > 0 && !roles.includes(user.rol)){
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
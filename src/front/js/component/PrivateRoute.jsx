import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { store, actions } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
    
        const token = sessionStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    
    if (isAuthenticated === null) return <h1>Cargando...</h1>;

    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

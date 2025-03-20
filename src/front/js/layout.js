import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import PrivateRoute from "./component/PrivateRoute.jsx"; // ✅ Importa el nuevo componente

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        
                        
                    <Route path="/" element={<Navigate to="/login" />} />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route path="/" element={<Navigate to="/login" />} />


                        {/* Ruta protegida usando PrivateRoute */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/private" element={<h1>Página Protegida</h1>} />
                        </Route>

                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

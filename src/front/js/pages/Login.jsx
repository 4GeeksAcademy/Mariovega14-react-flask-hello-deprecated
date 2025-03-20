import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { actions, store } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await actions.login(email, password);

        if (result.success) {
            alert("Inicio de sesión exitoso");
            setEmail("");
            setPassword("");
            navigate("/private");  // Redirigir a la ruta protegida
        }
    };

    return (
        <div className="login-container">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>

            {store.message && <p style={{ color: "green" }}>{store.message}</p>}
            {store.error && <p style={{ color: "red" }}>{store.error}</p>}
        </div>
    );
};

export default Login;

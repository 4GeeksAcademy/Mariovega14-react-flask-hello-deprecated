import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { actions, store } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const result = await actions.signup(email, password);

        if (result.success) {
            alert("Registro exitoso");
            setEmail("");
            setPassword("");
            navigate("/login"); // Redirigir al usuario al login
        }
    };

    return (
        <div className="signup-container">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit">Registrar</button>
            </form>

            {store.message && <p style={{ color: "green" }}>{store.message}</p>}
            {store.error && <p style={{ color: "red" }}>{store.error}</p>}
        </div>
    );
};

export default Signup;

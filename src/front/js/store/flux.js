const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
			token: sessionStorage.getItem("token") || null,
            message: null,
            error: null,
        },
        actions: {
            signup: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        setStore({ error: data.error, message: null });
                        return { success: false, error: data.error };
                    }

                    setStore({ message: data.message, error: null });
                    return { success: true, message: data.message };

                } catch (error) {
                    console.error("Error al conectar con el servidor", error);
                    setStore({ error: "Error al conectar con el servidor", message: null });
                    return { success: false, error: "Error al conectar con el servidor" };
                }
            },

            getMessage: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/hello");
                    const data = await response.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            clearMessages: () => {
                setStore({ error: null, message: null });
            },

			login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        setStore({ error: data.error, message: null });
                        return { success: false, error: data.error };
                    }

                    // Guardar token en sessionStorage
                    sessionStorage.setItem("token", data.token);
                    setStore({ token: data.token, message: data.message, error: null });

                    return { success: true, message: data.message };

                } catch (error) {
                    console.error("Error al conectar con el servidor", error);
                    setStore({ error: "Error al conectar con el servidor", message: null });
                    return { success: false, error: "Error al conectar con el servidor" };
                }
            },

            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null, message: null, error: null });
            },
        }
    };
};

export default getState;

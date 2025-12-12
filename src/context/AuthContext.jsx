import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (token) => {
        setToken(token);

        // 🔹 Tokenist user info parsimine (vanas versioonis kasutasid atob)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, email: payload.email });

        localStorage.setItem("token", token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    // Refreshi ajal token + user taastamine
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);

            // 🔹 Tokenist user info taastamine
            const payload = JSON.parse(atob(savedToken.split('.')[1]));
            setUser({ id: payload.id, email: payload.email, phone: payload.phone, role: payload.role, social_links: payload.social_links });
        }
    }, []);

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

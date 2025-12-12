import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Simuleerime “async loading” tokeni kontrolli
        const check = async () => {
            // siin võiks teha API call tokeni valideerimiseks
            await new Promise(r => setTimeout(r, 100));
            setReady(true);
        };
        check();
    }, []);

    if (!ready) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" replace />;

    return children;
}




/* import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" />;
}
 */
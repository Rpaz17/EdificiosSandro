import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { login as loginApi } from '../services/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                setLoading(false);
                return;
            }

            try{
                const res = await api.get("/auth/me");
                setUser(res.data.usuario);
            }catch(error){
                localStorage.removeItem("token");
                setUser(null);
            }finally{
                setLoading(false);
            }
        };
        bootstrap();
    }, []);

    const login = async (email, password) => {
        const { usuario } = await loginApi(email, password);
        setUser(usuario);
        return usuario;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = useMemo(() => ({ user, loading, login, logout}), [user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return ctx;
}

import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoverUser = () => {
            const storedUser = localStorage.getItem('u_user');
            const storedToken = localStorage.getItem('u_token');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                api.defaults.headers.Authorization = `Bearer ${storedToken}`;
            }
            setLoading(false);
        };

        recoverUser();
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', { email, senha });

            const { token, usuario } = response.data;

            localStorage.setItem('u_user', JSON.stringify(usuario));
            localStorage.setItem('u_token', token);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(usuario);
            return { success: true };
        } catch (error) {
            console.error("Login Error", error);
            return { success: false, message: error.response?.data?.mensagem || "Erro ao realizar login" };
        }
    };

    const logout = () => {
        localStorage.removeItem('u_user');
        localStorage.removeItem('u_token');
        api.defaults.headers.Authorization = null;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

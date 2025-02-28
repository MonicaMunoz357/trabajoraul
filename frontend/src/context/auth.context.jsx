import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../api/auth.user"; // Importamos la función loginRequest que ya tenías
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

// Creamos el contexto
export const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para iniciar sesión
    const login = async (userData) => {
        try {
            const res = await loginRequest(userData);
            
            if (res.data) {
                setUser(res.data);
                setIsAuth(true);
                setErrors([]);
                
                // Si el backend devuelve un token, lo guardamos en cookies
                if (res.data.token) {
                    Cookies.set("token", res.data.token, { expires: 1 }); // Expira en 1 día
                }
                
                return true;
            }
            return false;
        } catch (error) {
            // Manejamos los errores según el formato en que los devuelve tu API
            if (error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else if (error.response.data.message) {
                    setErrors([error.response.data.message]);
                } else {
                    setErrors(["Error en el inicio de sesión"]);
                }
            } else {
                setErrors(["Error de conexión con el servidor"]);
            }
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        // Eliminar la cookie
        Cookies.remove("token");
        // Resetear el estado
        setUser(null);
        setIsAuth(false);
        // Redirigir a login (opcional, puedes manejarlo en el componente)
        window.location.href = "/login";
    };

    // Verificar si hay una sesión activa al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("token");
            
            if (!token) {
                setIsAuth(false);
                setUser(null);
                setLoading(false);
                return;
            }
            
            try {
                // Aquí puedes implementar la verificación del token en el backend
                // Por ahora, asumimos que si hay token, el usuario está autenticado
                setIsAuth(true);
                // Podrías hacer una petición al backend para obtener los datos del usuario
                // const res = await verifyTokenRequest();
                // setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                Cookies.remove("token");
                setIsAuth(false);
                setUser(null);
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    // Limpiar los errores después de un tiempo
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Valores que provee el contexto
    const contextValue = {
        login,
        logout,
        user,
        setUser,
        isAuth,
        setIsAuth,
        errors,
        loading
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
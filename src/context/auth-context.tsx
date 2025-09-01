import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Tipos para el usuario y estado de autenticación
export interface User {
  id: string;
  email: string;
  name: string;
  nombre?: string; // Compatibilidad con sidebar
  role?: string;
  rol?: {
    nombre: string;
  };
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Función para inicializar la autenticación (verificar token almacenado)
  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // Aquí harías una llamada a tu API para verificar el token
      // Por ahora simularemos la verificación
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay de API

      // Ejemplo de usuario simulado - reemplazar con llamada real a la API
      const userData: User = {
        id: "1",
        email: "sellostore@company.com",
        name: "John Doe",
        nombre: "John Doe",
        role: "admin",
        rol: {
          nombre: "Administrador",
        },
      };

      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // Si hay error, limpiar el token y marcar como no autenticado
      localStorage.removeItem("authToken");
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Aquí harías la llamada a tu API de login
      // Por ahora simularemos el login
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular delay de API

      // Validación simple para demo - reemplazar con lógica real
      if (email === "sellostore@company.com" && password === "Sellostore.") {
        const userData: User = {
          id: "1",
          email: email,
          name: "John Doe",
          nombre: "John Doe",
          role: "admin",
          rol: {
            nombre: "Administrador",
          },
        };

        // Simular token JWT
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.token";
        localStorage.setItem("authToken", token);

        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  // Función para refrescar datos del usuario
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      // Aquí harías una llamada a tu API para obtener datos actualizados del usuario
      // Por ahora mantenemos los datos existentes
      console.log("Refreshing user data...");
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  // Inicializar autenticación al montar el componente
  useEffect(() => {
    initializeAuth();
  }, []);

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

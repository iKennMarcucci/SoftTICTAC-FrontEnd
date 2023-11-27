import { createContext, useContext, useState, useEffect } from "react";

import {
  loginRequest,
  validateTokenRequest,
} from "../Api/Peticiones/request.axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe estar dentro del proveedor AuthContextProvider"
    );
  }

  return context;
};

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        throw new Error("No token found");
      }

      const isValidToken = await validateTokenRequest();

      setUser(isValidToken.data[0]);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error(error);

      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const login = async (body) => {
    try {
      const res = await loginRequest(body);
      localStorage.clear();
      if (res.status === 200) {
        const now = new Date();
        const expiry = now.getTime() + 5 * 60 * 1000; // 5 minutes
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        localStorage.setItem("timestamp", expiry.toString());
        await checkAuthentication();
        return { status: 200 };
      }
      console.log("ERROR INESPERADO:", res);
      throw new Error("Unexpected error during login.");
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error for the calling component to handle
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("timestamp");
      setIsAuthenticated(false);
      setUser(null);
      return { status: 200 };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const value = {
    login,
    logout,
    checkAuthentication,
    user,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

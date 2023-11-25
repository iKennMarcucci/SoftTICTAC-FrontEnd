import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, validateTokenRequest } from '../Api/Peticiones/request.axios';

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {

   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [user, setUser] = useState(null)

   const checkAuthentication = async () => {
      try {
         const token = JSON.parse(localStorage.getItem('access'));
         if (token) {
            const isValidToken = await validateTokenRequest();
            setUser(isValidToken.data[0])
            setIsAuthenticated(true);
            return true
         }
         setUser(null)
         setIsAuthenticated(false);
         return false
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      checkAuthentication();
   }, [])

   const login = async (body) => {
      try {
         const res = await loginRequest(body);
         localStorage.clear();
         if (res.status === 200) {
            const now = new Date();
            const expiry = now.getTime() + 5 * 60 * 1000; // 5 minutes
            localStorage.setItem('access', JSON.stringify(res.data.access));
            localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
            localStorage.setItem('timestamp', expiry.toString());
            await checkAuthentication();
            return { status: 200 };
         }
         console.log('ERROR INESPERADO:', res);
         throw new Error('Unexpected error during login.');
      } catch (error) {
         console.error(error);
         throw error; // Rethrow the error for the calling component to handle
      }
   };

   const logout = () => {
      try {
         localStorage.removeItem('access');
         localStorage.removeItem('refresh');
         localStorage.removeItem('timestamp');
         setIsAuthenticated(false);
         setUser(null);
         return { status: 200 };
      } catch (error) {
         console.error(error);
         throw error;
      }
   };

   const value = {
      login, logout, checkAuthentication,
      user, isAuthenticated,
   };

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider
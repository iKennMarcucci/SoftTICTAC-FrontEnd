import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {

   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [user, setUser] = useState(null)

   const verifySession = () => {
      try {
         const token = localStorage.getItem('token')
         if (token) {
            setIsAuthenticated(true);
            setUser(JSON.parse(token));
            console.log("User authenticated");
            return;
         }
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      verifySession();
   }, [])

   const login = async (body) => {
      try {
         localStorage.setItem("token", JSON.stringify({ body }))
         setUser(body)
         setIsAuthenticated(true)
         return { status: 200 }
      } catch (error) {
         console.error(error);
      }
   }

   const logout = () => {
      try {
         localStorage.removeItem("token");
         setIsAuthenticated(false);
         setUser(null);
         console.log("user logged out");
      } catch (error) {
         console.error(error);
      }
   }

   const value = {
      login, logout,
      user, isAuthenticated
   };

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider

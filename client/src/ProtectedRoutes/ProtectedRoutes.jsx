import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Contextos/AuthContext";
import { useEffect } from "react";

function ProtectedRoutes() {
   const { checkAuthentication } = useAuth();
   const navigate = useNavigate();
   const getSession = async () => {
      const session = await checkAuthentication()
      if (session === false) {
         navigate('/login');
         return false
      }
      return true
   }

   useEffect(() => {
      getSession()
   }, []);

   return (
      <Outlet />
   );
}

export default ProtectedRoutes;

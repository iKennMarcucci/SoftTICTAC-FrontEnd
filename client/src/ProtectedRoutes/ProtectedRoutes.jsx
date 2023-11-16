import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Contextos/AuthContext";
import { useEffect } from "react";

function ProtectedRoutes() {
   const { verifySession } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const session = verifySession();
      if (session === false) navigate('/login');
   }, []);

   return (
      <Outlet />
   );
}

export default ProtectedRoutes;

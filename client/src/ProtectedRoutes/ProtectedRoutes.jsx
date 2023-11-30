import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../Contextos/AuthContext";

function ProtectedRoutes() {
  const { checkAuthentication } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSession() {
      const session = await checkAuthentication();

      if (session) {
        return true;
      }

      navigate("/login");
      return false;
    }

    getSession();
  }, [checkAuthentication, navigate]);

  return <Outlet />;
}

export default ProtectedRoutes;

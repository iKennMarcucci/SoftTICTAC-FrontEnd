import { createContext, useContext, useEffect, useState } from "react";

import {
  getHerramientasByStatus,
  getHerramientasRequest,
} from "@/Api/Peticiones/request.axios";
import { Status } from "@/types/Status";
import { isDocente, isLider } from "@/utils/User";
import { ejes } from "@/utils/ejes";
import { useAuth } from "../AuthContext";

const HerramientasContext = createContext();

export const useHerramienta = () => {
  const context = useContext(HerramientasContext);

  if (!context) {
    throw new Error(
      "useHerramienta debe estar dentro del proveedor HerramientasContextProvider",
    );
  }

  return context;
};

function getEjeByHerramienta(herramienta) {
  return ejes.find((eje) => eje.value === herramienta.id_tema.id_linea);
}

const HerramientasContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(Status.APROBADO);
  const [herramientas, setHerramientas] = useState([]);

  useEffect(() => {
    async function getHerramientas() {
      if (!user || !status) {
        return;
      }

      if (isLider(user) || isDocente(user)) {
        const response = await getHerramientasByStatus(status);
        setHerramientas(response.data);
        return;
      }

      const response = await getHerramientasRequest();
      setHerramientas(response.data);
    }

    getHerramientas();
  }, [user, status]);

  const value = {
    herramientas,
    ejes,
    status,
    onChangeStatus: setStatus,
    getEjeByHerramienta,
  };

  return (
    <HerramientasContext.Provider value={value}>
      {children}
    </HerramientasContext.Provider>
  );
};

export default HerramientasContextProvider;

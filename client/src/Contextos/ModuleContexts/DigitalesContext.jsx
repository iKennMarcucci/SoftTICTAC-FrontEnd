import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getContenidosByStatus,
  getContenidosRequest,
  sendContenidosRequest,
} from "@/Api/Peticiones/request.axios";
import { useAuth } from "@/Contextos/AuthContext";
import { isDocente, isLider } from "@/utils/User";
import { Status } from "@/types/Status";

const DigitalesContext = createContext();

export function useDigitales() {
  const context = useContext(DigitalesContext);

  if (!context) {
    throw new Error(
      "useDigitales debe estar dentro del proveedor DigitalesContextProvider",
    );
  }

  return context;
}

const DigitalesContextProvider = ({ children }) => {
  const { user } = useAuth();

  const [digitales, setDigitales] = useState([]);
  const [status, setStatus] = useState(Status.APROBADO);

  const getDigitales = useCallback(async () => {
    if (!user || !status) return;

    if (isLider(user) || isDocente(user)) {
      const res = await getContenidosByStatus(status);
      setDigitales(res.data);
      return;
    }

    const res = await getContenidosRequest();
    setDigitales(res.data);
  }, [user, status]);

  const sendContenidos = async (body) => {
    try {
      const token = localStorage.getItem("access");

      if (token) {
        await sendContenidosRequest(body, token);
        await getDigitales();
        return { status: 200 };
      }

      return { status: 400 };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDigitales();
  }, [getDigitales]);

  const value = {
    digitales,
    status,
    sendContenidos,
    onChangeStatus: setStatus,
  };

  return (
    <DigitalesContext.Provider value={value}>
      {children}
    </DigitalesContext.Provider>
  );
};

export default DigitalesContextProvider;

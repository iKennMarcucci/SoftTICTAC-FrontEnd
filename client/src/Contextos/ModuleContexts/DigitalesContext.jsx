import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getContenidosPendientes,
  getContenidosRequest,
  sendContenidosRequest,
} from "~/Api/Peticiones/request.axios";
import { useAuth } from "~/Contextos/AuthContext";
import { isLider } from "~/utils/User";

const DigitalesContext = createContext();

export function useDigitales() {
  const context = useContext(DigitalesContext);

  if (!context) {
    throw new Error(
      "useDigitales debe estar dentro del proveedor DigitalesContextProvider"
    );
  }

  return context;
}

const DigitalesContextProvider = ({ children }) => {
  const { user } = useAuth();

  const [digitales, setDigitales] = useState(null);

  const getDigitales = useCallback(async () => {
    if (!user) return;

    if (isLider(user)) {
      const res = await getContenidosPendientes();
      setDigitales(res.data);
      return;
    }

    const res = await getContenidosRequest();
    setDigitales(res.data);
  }, [user]);

  const sendContenidos = async (body) => {
    try {
      const token = localStorage.getItem("access");

      if (token) {
        const res = await sendContenidosRequest(body, token);
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
    sendContenidos,
  };

  return (
    <DigitalesContext.Provider value={value}>
      {children}
    </DigitalesContext.Provider>
  );
};

export default DigitalesContextProvider;

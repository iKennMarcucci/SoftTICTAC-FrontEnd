import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import {
    getPlanesByStatus,
    getPlanesRequest,
    sendPlanesRequest,
  } from "@/Api/Peticiones/request.axios";
  import { useAuth } from "@/Contextos/AuthContext";
  import { isDocente, isLider } from "@/utils/User";
  import { Status } from "@/types/Status";
  
  const PlanesContext = createContext();
  
  export function usePlanes() {
    const context = useContext(PlanesContext);
  
    if (!context) {
      throw new Error(
        "usePlanes debe estar dentro del proveedor PlanesContextProvider",
      );
    }
  
    return context;
  }
  
  const PlanesContextProvider = ({ children }) => {
    const { user } = useAuth();
  
    const [planes, setPlanes] = useState([]);
    const [status, setStatus] = useState(Status.APROBADO);
  
    const getPlanes = useCallback(async () => {
      if (!user || !status) return;
  
      if (isLider(user) || isDocente(user)) {
        const res = await getPlanesByStatus(status);
        setPlanes(res.data);
        return;
      }
  
      const res = await getPlanesRequest();
      setPlanes(res.data);
    }, [user, status]);
  
    const sendPlanes = async (body) => {
      try {
        const token = localStorage.getItem("access");
  
        if (token) {
          await sendPlanesRequest(body, token);
          await getPlanes();
          return { status: 200 };
        }
  
        return { status: 400 };
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getPlanes();
    }, [getPlanes]);
  
    const value = {
      planes,
      status,
      sendPlanes,
      onChangeStatus: setStatus,
    };
  
    return (
      <PlanesContext.Provider value={value}>
        {children}
      </PlanesContext.Provider>
    );
  };
  
  export default PlanesContextProvider;
  
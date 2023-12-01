import { createContext, useContext, useState, useEffect } from "react";

import { useAuth } from "../AuthContext";
import { isLider } from "@/utils/User";
import {
  getHerramientasByStatus,
  getHerramientasRequest,
} from "@/Api/Peticiones/request.axios";
import { Status } from "@/types/Status";

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

const ejes = [
  {
    value: 1,
    label: "Emprendimiento",
    competencias: [
      {
        value: 1,
        label:
          "Participa activamente en los ámbitos sociales e interpersonales, manifestando solidaridad e interés por la comunidad.",
      },
      {
        value: 2,
        label: "Capacidad de comunicarse constructivamente.",
      },
      {
        value: 3,
        label: "Conoce y aplica las normas de tránsito y seguridad vial.",
      },
    ],
  },
  {
    value: 2,
    label: "Sexualidad",
    competencias: [
      {
        value: 1,
        label:
          "Comprende los aspectos de la sexualidad humana, sus transiciones e implicaciones en la vida cotidiana.",
      },
      {
        value: 2,
        label:
          "Identifica la diversidad que existe en los seres humanos y sus formas de expresarla.",
      },
      {
        value: 3,
        label:
          "Toma decisiones centradas en el enfoque de derechos sexuales y reproductivos.",
      },
    ],
  },
  {
    value: 3,
    label: "Medio Ambiente",
    competencias: [
      {
        value: 1,
        label:
          "Comprende los procesos de cuidado y protección del medio ambiente.",
      },
      {
        value: 2,
        label: "Cuida y protege el medio ambiente.",
      },
      {
        value: 3,
        label:
          "Promueve en su comunidad el cuidado y protección del medio ambiente.",
      },
    ],
  },
  {
    value: 4,
    label: "Relaciones Sociales",
    competencias: [
      {
        value: 1,
        label:
          "Desarrolla pensamiento emprendedor en el ser, sentir, pensar y actuar.",
      },
      {
        value: 2,
        label:
          "Desarrolla hábitos y valores emprendedores que orienten el comportamiento para el éxito personal.",
      },
      {
        value: 3,
        label:
          "Tiene capacidad para entender el entorno socioeconómico en su contexto.",
      },
    ],
  },
  {
    value: 5,
    label: "TICS",
    competencias: [
      {
        value: 1,
        label:
          "Comprende que las TIC facilitan responder a problemas de su entorno y se deben utilizar de manera responsable.",
      },
      {
        value: 2,
        label:
          "Integra las TIC en el desarrollo de las actividades académicas y cotidianas para facilitar y agilizar los procesos operativos en los diferentes contextos.",
      },
      {
        value: 3,
        label: "Construye soluciones a problemas del contexto usando las TIC.",
      },
    ],
  },
];

function getEjeByHerramienta(herramienta) {
  return ejes.find((eje) => eje.value === herramienta.id_tema.id_linea);
}

const HerramientasContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(undefined);
  const [herramientas, setHerramientas] = useState([]);

  useEffect(() => {
    async function getHerramientas() {
      if (!user || !status) {
        return;
      }

      if (isLider(user)) {
        const response = await getHerramientasByStatus(status);
        setHerramientas(response.data);
        return;
      }

      if (status === Status.RECHAZADO) {
        const response = await getHerramientasByStatus(Status.RECHAZADO);
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

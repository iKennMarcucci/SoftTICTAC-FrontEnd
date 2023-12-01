import { useState } from "react";

import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import HerramientaDetails from "./Comp/HerramientaDetails";
import ModalCreateHerramienta from "./Comp/ModalCreateHerramienta";
import HerramientasControlItem from "./HerramientasControlItem";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isDocente, isLider } from "@/utils/User";
import { useAuth } from "@/Contextos/AuthContext";
import { Status } from "@/types/Status";

const initialRecursos = [
  {
    value: 1,
    label: "Crayones, Colores y Marcadores",
  },
  {
    value: 2,
    label: "Pliego de Cartulina",
  },
  {
    value: 3,
    label: "Pegante y Tijeras",
  },
  {
    value: 4,
    label: "Periódicos y Revistas",
  },
  {
    value: 5,
    label: "Plastilina",
  },
  {
    value: 6,
    label: "Pinceles y Pinturas",
  },
  {
    value: 7,
    label: "Papel Seda",
  },
  {
    value: 8,
    label: "Proyector y Sonido",
  },
  {
    value: 9,
    label: "Computadora Portatil",
  },
  {
    value: 10,
    label: "Palitos de Helado",
  },
];

const defaultValues = {
  nombre: "",
  objetivo: "",
  poblacion: [],
  tema: "",
  competencias: [],
  eje: {
    value: null,
    label: "Seleccione un eje",
    competencias: [],
  },
  visibilidad: false,
  recursos: initialRecursos,
  actividades: [
    {
      proceso: "",
      recursos: [],
      tiempo: {
        label: "",
        value: 0,
      },
    },
  ],
  presentacion: "",
  cierre: "",
  recomendacion: "",
  estado: "Pendiente",
};

function HerramientasControl() {
  const { user } = useAuth();
  const { herramientas, status, onChangeStatus, getEjeByHerramienta } =
    useHerramienta();

  const [showCreate, setShowCreate] = useState(false);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);

  const showMore = (herramienta) => {
    setSelectedHerramienta(herramienta);

    if (herramienta.estado === Status.RECHAZADO) {
      setShowCreate(true);
    }
  };

  const closeHerramientaDetails = () => {
    setSelectedHerramienta(null);
  };

  const openModalSubmit = () => {
    setShowCreate(true);
  };

  const closeModalCreate = () => {
    setShowCreate(false);
  };

  let modal = null;

  if (selectedHerramienta && selectedHerramienta.estado !== Status.RECHAZADO) {
    modal = (
      <HerramientaDetails
        herramienta={selectedHerramienta}
        onClose={closeHerramientaDetails}
      />
    );
  } else {
    let initialValues = defaultValues;

    if (selectedHerramienta) {
      const eje = getEjeByHerramienta(selectedHerramienta);

      const recursos = new Map();
      let index = 0;

      selectedHerramienta.momentos[1].procesos.forEach((proceso) => {
        proceso.recurso.split(",").forEach((recurso) => {
          if (!recursos.has(recurso)) {
            recursos.set(recurso, {
              value: index,
              label: recurso,
            });

            index++;
          }
        });
      });

      const competencias = selectedHerramienta.id_tema.id_competencia.map(
        (selectedCompetencia) => {
          const competencia = eje.competencias.find(
            (iterator) => iterator.value === selectedCompetencia.id,
          );

          return {
            value: selectedCompetencia.id,
            label: competencia.label,
          };
        },
      );

      const actividades = selectedHerramienta.momentos[1].procesos.map((p) => ({
        id: p.id,
        proceso: p.descripcion,
        recursos: p.recurso.split(",").map((r) => ({
          value: recursos.get(r).value,
          label: r,
        })),
        tiempo: {
          label: Number(p.tiempo / (60 * 1000)).toString(),
          value: p.tiempo,
        },
      }));

      initialValues = {
        id: selectedHerramienta.id,
        nombre: selectedHerramienta.nombre,
        objetivo: selectedHerramienta.objetivo,
        poblacion: selectedHerramienta.id_poblacion.map((p) => ({
          value: p.id,
          label: p.nombre,
        })),
        tema: selectedHerramienta.id_tema.nombre,
        competencias,
        eje,
        visibilidad: selectedHerramienta.visibilidad,
        recursos,
        actividades,
        presentacion: selectedHerramienta.momentos[0].descripcion,
        cierre: selectedHerramienta.momentos[2].descripcion,
        recomendacion: selectedHerramienta.revision,
        estado: selectedHerramienta.estado,
      };
    }

    modal = (
      <ModalCreateHerramienta
        mode={selectedHerramienta ? "edit" : "create"}
        initialValues={initialValues}
        isOpen={showCreate}
        onClose={closeModalCreate}
      />
    );
  }

  return (
    <>
      {modal}

      <div className="flex justify-between">
        <h2 className="text-2xl font-medium max-sm:mx-2">
          Herramientas Pedagógicas
        </h2>
        {isDocente(user) && (
          <button
            onClick={() => openModalSubmit()}
            className=" rounded-md bg-blue-100 px-2 font-normal hover:bg-blue-300"
          >
            Crear una Herramienta
          </button>
        )}
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="mb-4 flex justify-end">
        <Select value={status} onValueChange={(value) => onChangeStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione el status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {isLider(user) ? (
                <>
                  <SelectItem key={"Pendiente"} value={"Pendiente"}>
                    {"Pendiente"}
                  </SelectItem>
                  <SelectItem key={"Aprobado"} value={"Aprobado"}>
                    {"Aprobado"}
                  </SelectItem>
                </>
              ) : (
                <>
                  <SelectItem key={"Aprobado"} value={"Aprobado"}>
                    {"Aprobado"}
                  </SelectItem>
                  <SelectItem key={"Rechazado"} value={"Rechazado"}>
                    {"Rechazado"}
                  </SelectItem>
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {herramientas.length > 0 ? (
        <section className="grid grid-cols-12 gap-4">
          {herramientas.map((item) => (
            <HerramientasControlItem
              key={item.id}
              item={item}
              onShowMore={showMore}
            />
          ))}
        </section>
      ) : (
        <>
          <p className="mt-4 text-center text-xl">
            No existen Herramientas Pedagógicas creadas. ¡Crea una nueva!
          </p>
        </>
      )}
    </>
  );
}

export default HerramientasControl;

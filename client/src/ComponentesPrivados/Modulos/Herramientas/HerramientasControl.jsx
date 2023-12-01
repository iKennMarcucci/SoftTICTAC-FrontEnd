import { useState } from "react";

import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import HerramientaDetails from "./Comp/HerramientaDetails";
import ModalCreateHerramienta from "./Comp/ModalCreateHerramienta";
import HerramientasControlItem from "./HerramientasControlItem";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isDocente, isLider } from "@/utils/User";
import { useAuth } from "@/Contextos/AuthContext";

function HerramientasControl() {
  const { user } = useAuth();
  const { herramientas, status, onChangeStatus } = useHerramienta();

  const [showCreate, setShowCreate] = useState(false);
  const [selectedHerramienta, setSelectedHerramienta] = useState(-1);

  const showHerramientaDetails = (index) => {
    setSelectedHerramienta(index);
  };

  const closeHerramientaDetails = () => {
    setSelectedHerramienta(-1);
  };

  const openModalSubmit = () => {
    setShowCreate(true);
  };

  const closeModalCreate = () => {
    setShowCreate(false);
  };

  return (
    <>
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
      <ModalCreateHerramienta isOpen={showCreate} onClose={closeModalCreate} />
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="mb-4 flex justify-end">
        <Select value={status} onValueChange={(value) => onChangeStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
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
          </SelectContent>
        </Select>
      </div>
      {herramientas.length > 0 ? (
        <section className="grid grid-cols-12 gap-4">
          {herramientas.map((item, index) => (
            <HerramientasControlItem
              key={item.id}
              item={item}
              index={index}
              onShowMore={showHerramientaDetails}
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
      {selectedHerramienta !== -1 && (
        <HerramientaDetails
          id={selectedHerramienta}
          herramienta={herramientas[selectedHerramienta]}
          onClose={closeHerramientaDetails}
        />
      )}
    </>
  );
}

export default HerramientasControl;

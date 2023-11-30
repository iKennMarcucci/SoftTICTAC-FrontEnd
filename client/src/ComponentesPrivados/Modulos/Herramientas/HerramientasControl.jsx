import { useState } from "react";

import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import HerramientaDetails from "./Comp/HerramientaDetails";
import ModalCreateHerramienta from "./Comp/ModalCreateHerramienta";
import HerramientasItem from "./HerramientasItem";

function HerramientasControl() {
  const { herramientas } = useHerramienta();

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
        {/* el button lo que hará es sacar un modal con el form de una herramienta */}
        <button
          onClick={() => openModalSubmit()}
          className=" rounded-md font-normal px-2 bg-blue-100 hover:bg-blue-300"
        >
          Crear una Herramienta
        </button>
      </div>
      <ModalCreateHerramienta isOpen={showCreate} onClose={closeModalCreate} />
      <hr className="border-stone-400 max-sm:mx-2 mt-2 mb-4" />
      {herramientas.length > 0 ? (
        <section className="grid grid-cols-12 gap-4">
          {herramientas.map((item, index) => (
            <HerramientasItem
              key={item.id}
              item={item}
              index={index}
              onShowMore={showHerramientaDetails}
            />
          ))}
        </section>
      ) : (
        <>
          <p className="text-center text-xl mt-4">
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

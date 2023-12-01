import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";

export default function HerramientasControlItem({ item, index, onShowMore }) {
  const { ejes } = useHerramienta();

  const eje = ejes.find((eje) => eje.value === item.id_tema.id_linea);

  return (
    <div className="border-delgado col-span-6 flex flex-col items-center p-2">
      <h4 className="text-center text-2xl font-medium">{`Herramienta ${item.id} - ${item.nombre}`}</h4>
      <div className="m-2 p-2">
        <div className="border-delgado-x border-delgado-t grid grid-cols-2 items-center justify-center">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Población Objetivo</h5>
          </div>
          <div className="border-delgado-l col-span-1 overflow-auto whitespace-normal px-2">
            <p>{item.id_poblacion[0].nombre}</p>
          </div>
        </div>
        <div className="border-delgado-x border-delgado-t grid grid-cols-2 items-center justify-center">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Tema</h5>
          </div>
          <div className="border-delgado-l col-span-1 overflow-auto whitespace-normal px-2">
            <p>{item.id_tema.nombre}</p>
          </div>
        </div>
        <div className="border-delgado-x border-delgado-t grid grid-cols-2 items-center justify-center">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Objetivos</h5>
          </div>
          <div className="border-delgado-l col-span-1 overflow-auto whitespace-normal px-2">
            <p>{item.objetivo}</p>
          </div>
        </div>
        <div className="border-delgado-x border-delgado-y grid grid-cols-2 items-center justify-center">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Competencias</h5>
          </div>
          <div className="border-delgado-l col-span-1 overflow-auto whitespace-normal px-2">
            {item.id_tema.id_competencia.map((competencia) => {
              const { label } = eje.competencias.find(
                (iterator) => iterator.value,
              );

              return <p key={competencia.id}>• {label}</p>;
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => onShowMore(index)}
        className="mb-2 cursor-pointer rounded-md bg-blue-600 px-20 py-1 text-center font-medium text-white hover:bg-blue-500"
      >
        Ver más
      </button>
    </div>
  );
}

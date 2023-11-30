import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";

export default function HerramientasItem({ item, index, onShowMore }) {
  const { ejes } = useHerramienta();

  const eje = ejes.find((eje) => eje.value === item.id_tema.id_linea);

  return (
    <div className="col-span-6 border-delgado p-2 flex flex-col items-center">
      <h4 className="font-medium text-center text-2xl">{`Herramienta ${item.id} - ${item.nombre}`}</h4>
      <div className="m-2 p-2">
        <div className="grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Población Objetivo</h5>
          </div>
          <div className="col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l">
            <p>{item.id_poblacion[0].nombre}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Tema</h5>
          </div>
          <div className="col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l">
            <p>{item.id_tema.nombre}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-t">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Objetivos</h5>
          </div>
          <div className="col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l">
            <p>{item.objetivo}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center border-delgado-x border-delgado-y">
          <div className="col-span-1 text-center">
            <h5 className="font-normal">Competencias</h5>
          </div>
          <div className="col-span-1 px-2 overflow-auto whitespace-normal border-delgado-l">
            {item.id_tema.id_competencia.map((competencia) => {
              const { label } = eje.competencias.find(
                (iterator) => iterator.value
              );

              return <p key={competencia.id}>• {label}</p>;
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => onShowMore(index)}
        className="text-white font-medium px-20 text-center cursor-pointer hover:bg-blue-500 bg-blue-600 mb-2 rounded-md py-1"
      >
        Ver más
      </button>
    </div>
  );
}

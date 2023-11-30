import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";

const calcularTiempo = (tiempoMilis) => {
  const horas = Math.floor(tiempoMilis / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoMilis % (1000 * 60 * 60)) / (1000 * 60));

  if (horas <= 0) {
    return `${minutos} minutos`;
  }

  if (horas === 1) {
    return `${horas} hora y ${minutos} minutos`;
  }

  return `${horas} horas y ${minutos} minutos`;
};

const calcularDuracionTotal = (procesos = []) => {
  const total = procesos.reduce(
    (accumulator, current) => current.tiempo + accumulator,
    0
  );

  return calcularTiempo(total);
};

function HerramientaDetails({ herramienta, onClose }) {
  const { ejes } = useHerramienta();

  const eje = ejes.find((eje) => eje.value === herramienta.id_tema.id_linea);

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl sm:w-full">
          {/* Contenido del modal */}
          <h4 className="font-medium text-center text-2xl my-4">
            Herramienta {herramienta.id} - {herramienta.nombre}
          </h4>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 whitespace-normal overflow-y-auto max-h-modal">
            <table>
              <tbody>
                <tr>
                  <td className="border-delgado truncate px-4 text-center font-normal">
                    Población Objetivo
                  </td>
                  <td className="border-delgado px-4 text-justify">
                    {herramienta.id_poblacion.map((poblacion) => (
                      <p key={poblacion.id}>{poblacion.nombre}</p>
                    ))}
                  </td>
                </tr>

                <tr>
                  <td className="border-delgado px-4 text-center font-normal">
                    Tema
                  </td>
                  <td className="border-delgado px-4 text-justify">
                    {herramienta.id_tema.nombre}
                  </td>
                </tr>

                <tr className="border-delgado">
                  <td className="border-delgado px-4 text-center font-normal">
                    Objetivos
                  </td>
                  <td className="flex flex-col px-4 text-justify">
                    <p>{herramienta.objetivo}</p>
                  </td>
                </tr>

                <tr className="border-delgado">
                  <td className="border-delgado px-4 text-center font-normal">
                    Competencias
                  </td>
                  <td className="flex flex-col px-4 text-justify">
                    {herramienta.id_tema.id_competencia.map((competencia) => {
                      const { label } = eje.competencias.find(
                        (iterator) => iterator.value
                      );

                      return <p key={competencia.id}>• {label}</p>;
                    })}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="my-4 space-y-2">
              Momentos para desarrollar:
              <div>
                <h5 className="font-normal">
                  • Primer Momento - Presentación:
                </h5>
                <p className="text-justify px-4">
                  {herramienta.momentos[0].descripcion}
                </p>
              </div>
              <div>
                <h5 className="font-normal">• Segundo Momento - Desarrollo:</h5>
                {/* <p className="text-justify px-4">{item.momentos.desarrollo}</p> */}
              </div>
            </div>

            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="border-delgado w-7/12">Proceso</th>
                  <th className="border-delgado">Recurso</th>
                  <th className="border-delgado">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {herramienta.momentos[1].procesos?.map((proceso) => (
                  <tr className="border-delgado" key={proceso.id}>
                    <td className="border-delgado px-2 text-justify">
                      {proceso.descripcion}
                    </td>
                    <td className="text-center">
                      {proceso.recurso.split(",").map((recurso) => (
                        <p key={recurso}>• {recurso}</p>
                      ))}
                    </td>
                    <td className="border-delgado text-center">
                      {calcularTiempo(proceso.tiempo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h5 className="font-normal">• Tercer Momento - Cierre:</h5>
              <p className="text-justify px-4">
                {herramienta.momentos[2].descripcion}
              </p>
            </div>

            <div className="flex justify-center">
              <h5 className="font-normal">Duración:&nbsp;</h5>
              <p className="text-justify">
                {calcularDuracionTotal(herramienta.momentos[1].procesos)}
              </p>
            </div>

            {/* <table className="w-full">
              <tbody>
                <tr className="border-delgado">
                  <td className="border-delgado px-2">Recomendaciones</td>
                  <td className="px-2 text-justify">
                    <p>• {herramienta.recomendacion}</p>
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>

          {/* Botones del modal */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 hover:bg-blue-500 bg-blue-600 text-base text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HerramientaDetails;

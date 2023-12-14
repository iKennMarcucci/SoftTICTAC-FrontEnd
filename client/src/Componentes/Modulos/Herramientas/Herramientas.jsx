import { useEffect, useMemo, useState } from "react";

import { getHerramientasRequest } from "@/Api/Peticiones/request.axios";
import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import { SelectEjes } from "@/Componentes/SelectEjes";
import { ejes } from "@/utils/ejes";
import Pagination from "@/Componentes/Pagination";

const calcularTiempo = (tiempoMilis) => {
  const horas = Math.floor(tiempoMilis / (1000 * 60 * 60));

  const minutos = Math.floor((tiempoMilis % (1000 * 60 * 60)) / (1000 * 60));

  if (horas === 0) {
    return `${minutos} minutos`;
  }

  if (horas === 1) {
    return `${horas} hora y ${minutos} minutos`;
  }

  return `${horas} horas y ${minutos} minutos`;
};

const calcularDuracionTotal = (procesos = []) => {
  const total = procesos.reduce((total, current) => {
    return total + current.tiempo;
  }, 0);

  return calcularTiempo(total);
};

const itemsPerPage = 2;

function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [eje, setEje] = useState(null);
  const [page, setPage] = useState(1);

  const filteredHerramientas = useMemo(() => {
    return herramientas.filter((herramienta) => {
      if (!eje) return herramienta.visibilidad;

      const { value } = ejes.find(
        (eje) => eje.value === herramienta.id_tema.id_linea,
      );

      return value === eje && herramienta.visibilidad;
    });
  }, [herramientas, eje]);

  useEffect(() => {
    getHerramientasRequest()
      .then((response) => {
        setHerramientas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="container mx-auto mt-10">
      <h2 className="text-2xl font-medium max-sm:mx-2">
        Herramientas Pedagógicas
      </h2>
      <hr className="my-1 border-stone-400 max-sm:mx-2" />
      <div className="mt-2 flex justify-end">
        <SelectEjes value={eje} onValueChange={setEje} />
      </div>
      {filteredHerramientas.length > 0 ? (
        <>
          <section className="container mx-auto mt-2 grid grid-cols-12 justify-items-center">
            {filteredHerramientas
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item) => (
                <HerramientasPublicItem key={item.id} item={item} />
              ))}
          </section>
          <div className="mt-2 flex justify-center">
            <Pagination
              items={filteredHerramientas.length}
              itemsPerPage={itemsPerPage}
              selectedPage={page}
              onChangePage={setPage}
            />
          </div>
        </>
      ) : (
        <p className="text-center">
          No se ha encontrado ninguna Herramienta Pedagógica asociada al eje
          seleccionado
        </p>
      )}
    </main>
  );
}

function HerramientasPublicItem({ item }) {
  const { getEjeByHerramienta } = useHerramienta();

  const eje = getEjeByHerramienta(item);

  return (
    <div className="border-delgado col-span-6 m-2 rounded-md p-4 max-xl:col-span-12 max-sm:-translate-y-32 max-sm:scale-90">
      <div>
        <h4 className="mb-4 text-center text-2xl font-medium">
          Herramienta {item.id} - {item.nombre}
        </h4>
        <table>
          <tbody>
            <tr>
              <td className="border-delgado truncate px-4 text-center font-normal">
                Población objetivo
              </td>
              <td className="border-delgado px-4 text-justify">
                {item.id_poblacion.map((poblacion) => (
                  <p key={poblacion.id}>{poblacion.nombre}</p>
                ))}
              </td>
            </tr>

            <tr>
              <td className="border-delgado px-4 text-center font-normal">
                Tema
              </td>
              <td className="border-delgado px-4 text-justify">
                {item.id_tema.nombre}
              </td>
            </tr>

            <tr className="border-delgado">
              <td className="border-delgado px-4 text-center font-normal">
                Objetivos
              </td>
              <td className="flex flex-col px-4 text-justify">
                <p>{item.objetivo}</p>
              </td>
            </tr>

            <tr className="border-delgado">
              <td className="border-delgado px-4 text-center font-normal">
                Competencias
              </td>
              <td className="flex flex-col px-4 text-justify">
                {item.id_tema.id_competencia.map((competencia) => {
                  const { label } = eje.competencias.find(
                    (iterator) => iterator.value,
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
            <h5 className="font-normal">• Primer Momento - Presentación:</h5>
            <p className="px-4 text-justify">{item.momentos[0].descripcion}</p>
          </div>
          <div>
            <h5 className="font-normal">• Segundo Momento - Desarrollo:</h5>
            {/* <p className="px-4 text-justify">{item.momentos.desarrollo}</p> */}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="border-delgado w-7/12">Proceso</th>
              <th className="border-delgado">Recurso</th>
              <th className="border-delgado">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {item.momentos[1].procesos?.map((proceso, id) => (
              <tr className="border-delgado" key={id}>
                <td className="border-delgado px-2 text-justify">
                  {proceso.descripcion}
                </td>
                <td className="text-center">
                  {proceso.recurso.split(",").map((rec) => (
                    <p key={rec}>• {rec}</p>
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
          <p className="px-4 text-justify">{item.momentos[2].descripcion}</p>
        </div>

        <div className="flex justify-center">
          <h5 className="font-normal">Duración:&nbsp;</h5>
          <p className="text-justify">
            {calcularDuracionTotal(item.momentos[1].procesos)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Herramientas;

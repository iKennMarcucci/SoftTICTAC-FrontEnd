import { useEffect, useMemo, useState } from "react";

import { getPlanesRequest } from "@/Api/Peticiones/request.axios";
import ModalCreatePlanes from "@/ComponentesPrivados/Modulos/PlaneTrabajo/Comp/ModalCreatePlanes";
import { ejes } from "@/utils/ejes";
import { SelectEjes } from "@/Componentes/SelectEjes";
import Pagination from "@/Componentes/Pagination";

const itemsPerPage = 8;

function Planes() {
  const [planes, setPlanes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [eje, setEje] = useState(null);
  const [page, setPage] = useState(1);

  const filteredContenidos = useMemo(
    () =>
      planes.filter((d) => {
        if (!eje) return d.visibilidad;
        return d.id_linea === eje && d.visibilidad;
      }),
    [eje, planes],
  );

  useEffect(() => {
    getPlanesRequest()
      .then((res) => setPlanes(res.data))
      .catch((error) => console.error(error));
  }, []);

  function onShowMore(item) {
    setSelected(item);
  }

  return (
    <>
      <ModalCreatePlanes
        initialValues={
          selected && {
            type: selected.archivo ? "archivo" : "url",
            id: selected.id,
            url: selected.url,
            archivo: selected.archivo,
            nombre: selected.nombre,
            eje: {
              value: selected.id_linea,
              label: ejes.find((eje) => eje.value === selected.id_linea).label,
            },
            descripcion: selected.descripcion,
            id_poblacion: selected.id_poblacion.map((p) => ({
              value: p.id,
              label: p.nombre,
            })),
            visibilidad: selected.visibilidad,
            estado: selected.estado,
            recomendacion: selected.recomendacion,
          }
        }
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
      <main className="container mx-auto mt-10">
        <h2 className="text-2xl font-medium max-sm:mx-2">
          Planes de Trabajo 
        </h2>
        <hr className="border-stone-400 max-sm:mx-2" />
       
        {filteredContenidos.length > 0 ? (
          <>
            <section className="container mx-auto mt-10 grid grid-cols-12 justify-items-center">
              {filteredContenidos
                .slice(page - 1, page + itemsPerPage - 1)
                .map((item) => (
                  <ContenidoDigitalPublicoItem
                    key={item.id}
                    item={item}
                    onShowMore={onShowMore}
                  />
                ))}
            </section>
            <Pagination
              items={filteredContenidos.length}
              itemsPerPage={itemsPerPage}
              selectedPage={page}
              onChangePage={setPage}
            />
          </>
        ) : (
          <p className="text-center">
            No se ha encontrado ningún contenido digital asociado al eje
            seleccionado
          </p>
        )}
      </main>
    </>
  );
}

function ContenidoDigitalPublicoItem({ item, onShowMore }) {
  return (
    <div
      key={item.id}
      className={`
    col-span-3 mb-3 flex
    w-60 flex-col justify-between rounded-md border border-solid border-stone-400 p-4 max-2xl:col-span-3 max-xl:col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 max-sm:w-72`}
    >
      <div className="">
        <div className="flex text-xs text-stone-500">
          <p className="font-light">Población:&nbsp;</p>
          {item.id_poblacion.nombre}
        </div>
        <div className="mb-4 h-52 w-full overflow-hidden rounded-lg bg-blue-50 p-4">
          <img
            src={"/Logos/SingleLogo.webp"}
            alt={item.titulo}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="text-center">
          <h2 className="line-clamp-2 text-xl font-normal" title={item.titulo}>
            {item.titulo}
          </h2>
          <p className="mt-2 line-clamp-3 text-xs" title={item.descripcion}>
            {item.descripcion}
          </p>
        </div>
      </div>

      <button
        onClick={() => onShowMore(item)}
        className="my-2 cursor-pointer rounded-md bg-blue-600 px-20 py-1 text-center font-medium text-white hover:bg-blue-500"
      >
        Ver
      </button>
    </div>
  );
}

export default Planes;

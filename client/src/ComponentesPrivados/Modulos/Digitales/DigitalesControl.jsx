import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/Contextos/AuthContext";
import { useDigitales } from "@/Contextos/ModuleContexts/DigitalesContext";
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
import ModalCreateDigitales from "./Comp/ModalCreateDigitales";
import { ejes } from "@/utils/ejes";
import { Status } from "@/types/Status";
import { SelectEjes } from "@/Componentes/SelectEjes";
import Pagination from "@/Componentes/Pagination";

const itemsPerPage = 8;

function DigitalesControl() {
  const { user } = useAuth();
  const { digitales, onChangeStatus } = useDigitales();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selected, setSelected] = useState(null);
  const [eje, setEje] = useState(null);
  const [page, setPage] = useState(1);

  const filteredDigitales = digitales.filter((d) => d.id_linea === eje || !eje);

  const initialValues = useMemo(() => {
    if (!selected) {
      return {
        type: "url",
        url: "",
        archivo: null,
        nombre: "",
        eje: {
          value: null,
          label: "Seleccione un eje",
        },
        descripcion: "",
        id_poblacion: [],
        visibilidad: false,
        estado: "Pendiente",
        recomendacion: "",
      };
    }

    return {
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
    };
  }, [selected]);

  const showModalCreate = () => {
    setIsOpen(true);
    setMode("create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function onShowMore(contenido) {
    setIsOpen(true);
    setMode("view");
    setSelected(contenido);
  }

  useEffect(() => {
    if (isLider(user)) {
      setEje(Number(user.information.user_type));
    }
  }, [user]);

  return (
    <>
      <ModalCreateDigitales
        mode={mode}
        initialValues={initialValues}
        isOpen={isOpen}
        onClose={closeModal}
      />

      <div className="flex justify-between">
        <h2 className="text-2xl font-medium max-sm:mx-2">
          Contenidos Digitales
        </h2>
        {isDocente(user) && (
          <button
            onClick={showModalCreate}
            className="rounded-md bg-blue-100 px-2 font-normal hover:bg-blue-300"
          >
            Crear un Contenido Digital
          </button>
        )}
      </div>

      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="mb-4 flex justify-end gap-2">
        {isDocente(user) && <SelectEjes value={eje} onValueChange={setEje} />}
        <Select
          defaultValue={Status.APROBADO}
          onValueChange={(value) => onChangeStatus(value)}
        >
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
                  <SelectItem key={"Pendiente"} value={"Pendiente"}>
                    {"Pendiente"}
                  </SelectItem>
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
      {filteredDigitales.length > 0 ? (
        <>
          <section className="grid grid-cols-12 gap-4">
            {filteredDigitales
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item) => (
                <div
                  key={item.id}
                  className="border-delgado col-span-2 mb-3 flex w-60 flex-col justify-between rounded-md p-4 max-2xl:col-span-3 max-xl:col-span-3 max-lg:col-span-4 max-md:col-span-6 max-sm:col-span-12 max-sm:w-72"
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
                      <h2
                        className="line-clamp-2 text-xl font-normal"
                        title={item.titulo}
                      >
                        {item.titulo}
                      </h2>
                      <p
                        className="mt-2 line-clamp-3 text-xs"
                        title={item.descripcion}
                      >
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
              ))}
          </section>
          <Pagination
            items={filteredDigitales.length}
            itemsPerPage={itemsPerPage}
            selectedPage={page}
            onChangePage={setPage}
          />
        </>
      ) : (
        <>
          <p className="mt-4 text-center text-xl">
            No existen Contenidos Digitales creados. ¡Crea uno nuevo!
          </p>
        </>
      )}
    </>
  );
}

export default DigitalesControl;

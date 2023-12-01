import { useRef, useState } from "react";

import * as requests from "@/Api/Peticiones/request.axios";
import { useAuth } from "@/Contextos/AuthContext";
import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Status } from "@/types/Status";
import { isLider } from "@/utils/User";

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
    0,
  );

  return calcularTiempo(total);
};

function HerramientaDetails({ herramienta, onClose }) {
  const { user } = useAuth();
  const { ejes } = useHerramienta();

  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const textarea = useRef(null);

  const eje = ejes.find((eje) => eje.value === herramienta.id_tema.id_linea);

  function handleApprove() {
    requests
      .approveHerramienta(herramienta.id)
      .then(() => {
        alert("Herramienta aprobada");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        alert("Ocurrió un error al aprobar la herramienta");
      });
  }

  function handleReject() {
    if (!textarea.current.value.trim()) {
      setIsAlertOpened(true);
      return;
    }

    requests
      .rejectHerramienta(herramienta.id, textarea.current.value)
      .then(() => {
        alert("Herramienta rechazada");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        alert("Ocurrió un error al rechazar la herramienta");
      });
  }

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle">
            <AlertDialog
              open={isAlertOpened}
              onOpenChange={(isOpened) => setIsAlertOpened(isOpened)}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    La recomendación es necesaria
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Por favor ingrese una recomendación para rechazar la
                    herramienta
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cerrar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <h4 className="my-4 text-center text-2xl font-medium">
              Herramienta {herramienta.id} - {herramienta.nombre}
            </h4>
            <div className="max-h-modal overflow-y-auto whitespace-normal bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                  <h5 className="font-normal">
                    • Primer Momento - Presentación:
                  </h5>
                  <p className="px-4 text-justify">
                    {herramienta.momentos[0].descripcion}
                  </p>
                </div>
                <div>
                  <h5 className="font-normal">
                    • Segundo Momento - Desarrollo:
                  </h5>
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
                <p className="px-4 text-justify">
                  {herramienta.momentos[2].descripcion}
                </p>
              </div>

              <div className="flex justify-center">
                <h5 className="font-normal">Duración:&nbsp;</h5>
                <p className="text-justify">
                  {calcularDuracionTotal(herramienta.momentos[1].procesos)}
                </p>
              </div>
            </div>

            {isLider(user) && herramienta.estado === Status.PENDIENTE && (
              <>
                <div className="mb-4 w-full px-6">
                  <textarea
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Recomendaciones"
                    ref={textarea}
                  />
                </div>

                <div className="flex w-full justify-center gap-2">
                  <button
                    className="rounded-md  bg-green-600 px-4 py-2 font-medium text-white"
                    onClick={handleApprove}
                  >
                    Aprobar
                  </button>
                  <button
                    className="rounded-md bg-red-600 px-4 py-2 font-medium text-white"
                    onClick={handleReject}
                  >
                    Rechazar
                  </button>
                </div>
              </>
            )}

            {/* Botones del modal */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HerramientaDetails;

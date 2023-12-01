import { useState } from "react";
import Select from "react-select";

import { useDigitales } from "@/Contextos/ModuleContexts/DigitalesContext";
import Alert from "@/Alertas/Alert";
import { isDocente, isLider } from "@/utils/User";
import { useAuth } from "@/Contextos/AuthContext";
import { Status } from "@/types/Status";
import { Controller, useForm } from "react-hook-form";
import { ejes } from "@/utils/ejes";
import { poblaciones } from "@/utils/poblaciones";
import {
  approveContenido,
  rejectContenido,
  updateContenido,
} from "@/Api/Peticiones/request.axios";

function ModalCreateDigitales({ initialValues, isOpen, onClose }) {
  const { user } = useAuth();
  const { sendContenidos } = useDigitales();

  const form = useForm({
    values: initialValues,
    defaultValues: initialValues,
  });

  const [alert, setAlert] = useState(null);

  const type = form.watch("type");

  function handleApprove() {
    approveContenido(initialValues.id)
      .then(() => {
        onClose();
      })
      .catch((error) => console.error(error));
  }

  function handleReject() {
    const recomendacion = form.getValues("recomendacion");

    if (!recomendacion) {
      alert("Debes escribir una recomendación");
      return;
    }

    rejectContenido(initialValues.id, recomendacion)
      .then(() => {
        onClose();
      })
      .catch((error) => console.error(error));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    form.setValue("archivo", file);
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        id_linea: values.eje.value,
        nombre: values.nombre,
        descripcion: values.descripcion,
        id_poblacion: JSON.stringify(
          values.id_poblacion.map((option) => ({
            id: option.value,
          })),
        ),
        visibilidad: values.visibilidad,
      };

      if (values.type === "url") {
        data.url = values.url;
      } else {
        data.archivo = values.archivo;
      }

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      let response;

      if (initialValues.estado === Status.RECHAZADO) {
        response = await updateContenido(initialValues.id, formData);
      } else {
        response = await sendContenidos(data);
      }

      if (response.status === 200) {
        setAlert({
          title: "Contenido Digital Creado",
          desc: "Has creado un contenido digital. Espera a que el Líder PPT lo revise y decida su publicación, o te proporcione retroalimentación.",
          bg_color: "bg-green-100",
          border_color: "border-green-500",
          text_color: "text-green-900",
          svg_color: "text-green-500",
          bar_color: "bg-green-500",
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#eff6ff",
    }),
  };

  return (
    isOpen && (
      <div className="fixed inset-0 overflow-y-auto">
        {alert && (
          <Alert
            msg={{
              title: alert.title,
              desc: alert.desc,
              bg_color: alert.bg_color,
              border_color: alert.border_color,
              text_color: alert.text_color,
              svg_color: alert.svg_color,
              bar_color: alert.bar_color,
            }}
            onClick={() => setAlert(null)}
          />
        )}
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <>
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
          </>
          <div className="inline-block max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle">
            {/* Contenido del modal */}
            <h4 className="my-4 text-center text-2xl font-medium">
              Crear Contenido Digital
            </h4>
            <div
              className="flex flex-col overflow-y-auto bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
              id="Modal"
            >
              <div className="radio-input">
                <label className="p-1 px-5 max-sm:px-2">
                  <input
                    type="radio"
                    id="value-1"
                    name="value-radio"
                    value="value-1"
                    className="hidden"
                    defaultChecked={type === "url"}
                    onClick={() => form.setValue("type", "url")}
                  />
                  <span className="flex font-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    <p className="ml-2 max-sm:hidden">URL</p>
                  </span>
                </label>
                <label className="p-1 px-5 max-sm:px-2">
                  <input
                    type="radio"
                    id="value-2"
                    name="value-radio"
                    value="value-2"
                    className="hidden"
                    defaultChecked={type === "archivo"}
                    onClick={() => form.setValue("type", "archivo")}
                  />
                  <span className="flex font-normal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                    <p className="ml-2 max-sm:hidden">Archivo</p>
                  </span>
                </label>
              </div>

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="col-span-1 mx-6 my-5 flex flex-col items-center justify-center max-sm:col-span-3"
              >
                <div className="w-full max-w-md space-y-4">
                  <div>
                    {type === "url" ? (
                      <Controller
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <>
                            <label htmlFor="url" className="block text-sm">
                              URL
                            </label>
                            <input
                              {...field}
                              type="url"
                              id="url"
                              className="border-delgado w-full rounded-lg bg-blue-50 p-2.5 text-sm"
                              placeholder="https://www.ejemplo.com"
                              required
                            />
                          </>
                        )}
                      />
                    ) : (
                      <>
                        <div className="relative flex flex-col items-center rounded-2xl border-2 border-dashed bg-white p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={0.8}
                            stroke="currentColor"
                            className="h-20 w-20"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                          </svg>

                          <h3>
                            {form.watch("archivo")?.name ??
                              "Arrastra y suelta archivos"}
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            Soporta archivos: PNG, PDF, JPG
                          </p>

                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <label htmlFor="eje" className="block text-sm">
                      Eje
                    </label>
                    <Controller
                      control={form.control}
                      name="eje"
                      render={({ field }) => (
                        <Select
                          defaultValue={field.value}
                          onChange={(value) => form.setValue("eje", value)}
                          options={ejes}
                          placeholder="Elige un eje"
                          menuPortalTarget={document.body}
                          id="eje"
                          styles={customStyles}
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="nombre" className="block text-sm">
                      Título
                    </label>
                    <Controller
                      control={form.control}
                      name={"nombre"}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="nombre"
                          className="border-delgado w-full rounded-lg bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe el título"
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="desc" className="block text-sm">
                      Descripción
                    </label>
                    <Controller
                      control={form.control}
                      name={"descripcion"}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="desc"
                          className="border-delgado w-full rounded-lg bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe la descripción"
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="poblacion" className="block text-sm">
                      Población
                    </label>
                    <Controller
                      control={form.control}
                      name="id_poblacion"
                      render={({ field }) => (
                        <Select
                          defaultValue={field.value}
                          onChange={(value) =>
                            form.setValue("id_poblacion", value)
                          }
                          options={poblaciones}
                          placeholder="Elige una población"
                          styles={customStyles}
                          isMulti
                          required
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="estado" className="block text-sm">
                      Estado
                    </label>
                    <label className="cyberpunk-checkbox-label">
                      <Controller
                        control={form.control}
                        name="visibilidad"
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            className="cyberpunk-checkbox"
                            id="estado"
                            name="estado"
                            checked={field.value}
                            onChange={() =>
                              form.setValue("visibilidad", !field.value)
                            }
                          />
                        )}
                      />
                      Público
                    </label>
                  </div>

                  {isDocente(user) &&
                    initialValues.estado !== Status.APROBADO && (
                      <div className="text-center">
                        <button
                          type="submit"
                          className="w-full rounded-lg bg-blue-500 py-2 font-medium text-white hover:bg-blue-400 max-sm:mb-8"
                        >
                          Enviar
                        </button>
                      </div>
                    )}

                  {isDocente(user) &&
                    initialValues.estado === Status.RECHAZADO && (
                      <Controller
                        control={form.control}
                        name="recomendacion"
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Recomendaciones"
                            readOnly
                          />
                        )}
                      />
                    )}

                  {isLider(user) &&
                    initialValues.estado === Status.PENDIENTE && (
                      <>
                        <div className="mb-4 w-full px-6">
                          <Controller
                            control={form.control}
                            name="recomendacion"
                            render={({ field }) => (
                              <textarea
                                {...field}
                                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Recomendaciones"
                              />
                            )}
                          />
                        </div>

                        <div className="flex w-full justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-md  bg-green-600 px-4 py-2 font-medium text-white"
                            onClick={handleApprove}
                          >
                            Aprobar
                          </button>
                          <button
                            type="button"
                            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white"
                            onClick={handleReject}
                          >
                            Rechazar
                          </button>
                        </div>
                      </>
                    )}
                </div>
              </form>
            </div>

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
    )
  );
}

export default ModalCreateDigitales;

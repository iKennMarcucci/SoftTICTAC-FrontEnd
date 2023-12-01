import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import {
  sendHerramientasRequest,
  updateHerramienta,
} from "@/Api/Peticiones/request.axios";
import { useHerramienta } from "@/Contextos/ModuleContexts/HerramientasContext";
import { isDocente } from "@/utils/User";
import { Status } from "@/types/Status";
import { useAuth } from "@/Contextos/AuthContext";

const poblaciones = [
  {
    value: 1,
    label: "Basica Primaria",
  },
  {
    value: 2,
    label: "Básica Secundaria",
  },
  {
    value: 3,
    label: "Media",
  },
];

const MINUTES_MULTIPLIER = 5;

const tiempoOptions = [
  {
    // Convetir a milisegundos
    value: 1 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "5",
  },
  {
    value: 2 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "10",
  },
  {
    value: 3 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "15",
  },
  {
    value: 4 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "20",
  },
  {
    value: 5 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "25",
  },
  {
    value: 6 * MINUTES_MULTIPLIER * 60 * 1000,
    label: "30",
  },
];

/**
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @returns
 */
function ModalCreateHerramienta({ initialValues, mode, isOpen, onClose }) {
  const { user } = useAuth();

  const form = useForm({
    values: initialValues,
    defaultValues: initialValues,
  });

  const actividades = form.watch("actividades");

  const { ejes } = useHerramienta();
  const [nuevoRecurso, setNuevoRecurso] = useState("");

  const handleRecursoChange = (event) => {
    setNuevoRecurso(event.target.value);
  };

  const handleAgregarRecurso = () => {
    if (nuevoRecurso.trim() === "") {
      alert("Por favor, ingresa un nombre de recurso válido.");
      return;
    }

    const recursos = form.getValues("recursos");

    if (
      recursos.some(
        (recurso) =>
          recurso.label.toLocaleLowerCase() ===
          nuevoRecurso.toLocaleLowerCase(),
      )
    ) {
      alert("El recurso ya está en la lista.");
      return;
    }

    form.setValue("recursos", [
      ...recursos,
      { label: nuevoRecurso, value: recursos.length },
    ]);

    setNuevoRecurso("");
  };

  const handleAgregarFila = () => {
    const actividades = form.getValues("actividades");

    form.setValue("actividades", [
      ...actividades,
      { proceso: "", recursos: [], tiempo: 0 },
    ]);
  };

  const handleEliminarFila = () => {
    const prev = form.getValues("actividades");
    form.setValue("actividades", prev.slice(0, -1));
  };

  const handleSelectMinutosChange = (index, selectedMinutos) => {
    const actividades = form.getValues("actividades");
    const newState = [...actividades];

    newState[index] = {
      ...newState[index],
      tiempo: selectedMinutos,
    };

    form.setValue("actividades", newState);
  };

  const handleSelectRecursoChange = (index, selectedOption) => {
    form.setValue(`actividades.${index}.recursos`, selectedOption);
  };

  const handleSubmit = async (values) => {
    try {
      const duracion = actividades.reduce((accumulator, current) => {
        const milliseconds = current.tiempo.value;
        return accumulator + milliseconds;
      }, 0);

      const data = {
        tema: {
          nombre: values.tema,
          id_competencia: values.competencias.map((item) => ({
            id: item.value,
          })),
          id_linea: values.eje.value,
        },
        herramienta: {
          nombre: values.nombre,
          objetivo: values.objetivo,
          recomendacion: "No aplica",
          visibilidad: values.visibilidad,
          id_poblacion: values.poblacion.map((item) => ({ id: item.value })),
          duracion,
        },
        momentos: [
          {
            nombre: "Presentación",
            descripcion: values.presentacion,
          },
          {
            nombre: "Desarrollo",
            descripcion: "Explicación de desarrollo",
            procesos: values.actividades.map((actividad) => ({
              id: actividad.id,
              descripcion: actividad.proceso,
              recurso: actividad.recursos
                .map((recurso) => recurso.label)
                .join(","),
              tiempo: Number(actividad.tiempo.value),
            })),
          },
          {
            nombre: "Cierre",
            descripcion: values.cierre,
          },
        ],
      };

      if (mode === "edit") {
        updateHerramienta(initialValues.id, data);
      } else {
        sendHerramientasRequest(data);
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

  const customStyles2 = {
    menuList: (provided) => ({
      ...provided,
      maxHeight: "200px",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#eff6ff",
      width: "220px",
    }),
  };

  const NoOptionsMessage = () => (
    <h5 className="w-full cursor-not-allowed select-none text-center text-gray-400">
      Elige un Eje Transversal Primero
    </h5>
  );

  return (
    isOpen && (
      <div className="fixed inset-0 overflow-y-auto">
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
          <div className="inline-block max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle">
            {/* Contenido del modal */}
            <div className="mb-0.5 py-4 shadow-lg">
              <h4 className="text-center text-2xl font-medium">
                Crear Herramienta Pedagógica
              </h4>
            </div>

            <div className="max-h-modal flex flex-col overflow-y-auto px-4 pb-4">
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="mx-6 flex flex-col items-center"
              >
                <h3 className="mt-4 w-full max-w-3xl">General</h3>
                <hr className="border-delgado-b mb-4 w-full max-w-3xl" />
                <div className="mb-4 w-full max-w-2xl space-y-4">
                  <Controller
                    control={form.control}
                    name="eje"
                    render={({ field }) => (
                      <div>
                        <label htmlFor="eje" className="block text-sm">
                          Eje
                        </label>
                        <Select
                          defaultValue={field.value}
                          onChange={(value) => {
                            const { competencias, ...rest } = value;

                            form.setValue("eje", rest);
                            form.setValue("eje.competencias", competencias);
                          }}
                          options={ejes}
                          placeholder="Seleccione un eje"
                          menuPortalTarget={document.body}
                          id="eje"
                          styles={customStyles}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <div>
                        <label htmlFor="nombre" className="block text-sm">
                          Nombre de la Herramienta
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          value={field.value}
                          className="border-delgado w-full rounded-md bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe el nombre de la herramienta"
                          required
                          maxLength={50}
                          onChange={(e) => {
                            form.setValue(
                              "nombre",
                              e.target.value.slice(0, 50),
                            );
                          }}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="poblacion"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <label htmlFor="poblacion" className="block text-sm">
                          Población Objetivo
                        </label>
                        <Select
                          defaultValue={field.value}
                          onChange={(value) => {
                            form.setValue("poblacion", value);
                          }}
                          options={poblaciones}
                          placeholder="Elige una población"
                          menuPortalTarget={document.body}
                          id="poblacion"
                          styles={customStyles}
                          isMulti
                          required
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="tema"
                    render={({ field }) => (
                      <div>
                        <label htmlFor="tema" className="block text-sm">
                          Tema
                        </label>
                        <input
                          {...field}
                          type="text"
                          id="tema"
                          className="border-delgado w-full rounded-lg bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe el tema"
                          required
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="objetivo"
                    render={({ field }) => (
                      <div>
                        <label htmlFor="objetivo" className="block text-sm">
                          Objetivo
                        </label>
                        <input
                          {...field}
                          type="text"
                          name="objetivo"
                          id="objetivo"
                          className="border-delgado w-full rounded-lg bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe el objetivo a alcanzar"
                          required
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="competencias"
                    control={form.control}
                    render={({ field }) => {
                      const competencias = form.watch("eje.competencias");

                      return (
                        <div>
                          <label htmlFor="compe" className="block text-sm">
                            Competencias
                          </label>
                          <Select
                            defaultValue={field.value}
                            onChange={(value) =>
                              form.setValue("competencias", value)
                            }
                            options={competencias}
                            placeholder="Elige las competencias a desarrollar"
                            menuPortalTarget={document.body}
                            id="compe"
                            styles={customStyles}
                            isMulti
                            required
                            components={{
                              NoOptionsMessage,
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                </div>

                <h3 className="w-full max-w-3xl">Momentos para desarrollar</h3>
                <hr className="border-delgado-b mb-4 w-full max-w-3xl" />
                <div className="mb-4 w-full max-w-2xl space-y-4">
                  <Controller
                    name="presentacion"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor="presentacion"
                          className="block text-sm font-normal"
                        >
                          Primer Momento (Presentación):
                        </label>
                        <textarea
                          {...field}
                          name="presentacion"
                          id="presentacion"
                          className="border-delgado min-h-[100px] w-full resize-none rounded-lg bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe como se desarrollará la presentación de la herramienta"
                          required
                        />
                      </div>
                    )}
                  />

                  <div>
                    <label
                      htmlFor="desarrollo"
                      className="block text-sm font-normal"
                    >
                      Segundo Momento (Desarrollo):
                    </label>
                    <p className="mb-4">
                      El taller se desarrolla a través de las siguientes
                      actividades que se describen a continuación:
                    </p>

                    <div className="mb-2">
                      <label
                        htmlFor="recursoxdd"
                        className="block text-sm font-normal"
                      >
                        Nombre del Recurso
                      </label>
                      <div className="grid grid-cols-12 gap-2">
                        <input
                          type="text"
                          name="recurso"
                          id="recurso"
                          className="border-delgado col-span-9 w-full rounded-md bg-blue-50 p-2.5 text-sm"
                          placeholder="Escribe el recurso a utilizar"
                          value={nuevoRecurso}
                          onChange={handleRecursoChange}
                        />
                        <button
                          type="button"
                          className="border-delgado col-span-3 rounded-md bg-blue-600 font-normal text-white hover:bg-blue-500"
                          onClick={handleAgregarRecurso}
                        >
                          Añadir Recurso
                        </button>
                      </div>
                    </div>

                    <table className="w-full text-center">
                      <thead>
                        <tr>
                          <th className="border-delgado w-6/12">Proceso</th>
                          <th className="border-delgado">Recurso</th>
                          <th className="border-delgado">Tiempo (min)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {actividades.map((actividad, index) => (
                          <tr key={index} className="border-delgado">
                            <td className="border-delgado px-2 pt-2 text-justify">
                              <Controller
                                name={`actividades.${index}.proceso`}
                                control={form.control}
                                render={({ field }) => (
                                  <textarea
                                    {...field}
                                    className="border-delgado min-h-[100px] w-full resize-none rounded-lg bg-blue-50 p-2.5 text-sm"
                                    placeholder="Escribe cuales son los procesos de desarrollo de la herramienta"
                                    required
                                  />
                                )}
                              />
                            </td>
                            <td className="border-delgado-r px-2 text-start">
                              <Controller
                                name={`actividades.${index}.recursos`}
                                control={form.control}
                                render={({ field }) => {
                                  const recursos = form.getValues("recursos");

                                  return (
                                    <Select
                                      value={field.value}
                                      onChange={(selectedOption) => {
                                        handleSelectRecursoChange(
                                          index,
                                          selectedOption,
                                        );
                                      }}
                                      options={recursos}
                                      isSearchable={false}
                                      placeholder="Recursos..."
                                      id={`recursos-${index}`}
                                      styles={customStyles2}
                                      isMulti
                                      required
                                    />
                                  );
                                }}
                              />
                            </td>
                            <td className="px-2 text-start">
                              <Select
                                value={actividad.tiempo}
                                onChange={(selectedMinutos) =>
                                  handleSelectMinutosChange(
                                    index,
                                    selectedMinutos,
                                  )
                                }
                                options={tiempoOptions}
                                isSearchable={false}
                                placeholder="Min"
                                id={`minutos-${index}`}
                                styles={customStyles}
                                required
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-center">
                      <svg
                        onClick={handleAgregarFila}
                        className="h-10 w-10 cursor-pointer stroke-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <svg
                        onClick={handleEliminarFila}
                        className="h-10 w-10 cursor-pointer stroke-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <Controller
                    name="cierre"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <label
                          htmlFor="cierre"
                          className="block text-sm font-normal"
                        >
                          Tercer Momento (Cierre):
                        </label>
                        <textarea
                          {...field}
                          id="cierre"
                          className="border-delgado min-h-[100px] w-full resize-none rounded-lg bg-blue-50 p-2.5 text-sm"
                          required
                          placeholder="Escribe como se cerrará el desarrollo de la herramienta"
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="visibilidad"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <div>
                          <label htmlFor="estado" className="block text-sm">
                            Estado
                          </label>
                          <label className="cyberpunk-checkbox-label">
                            <input
                              {...field}
                              type="checkbox"
                              className="cyberpunk-checkbox"
                              id="estado"
                              name="estado"
                              checked={field.value}
                              onChange={() => {
                                form.setValue("visibilidad", !field.value);
                              }}
                            />
                            Público
                          </label>
                        </div>
                      );
                    }}
                  />
                </div>

                {isDocente(user) &&
                  initialValues.estado === Status.RECHAZADO && (
                    <div className="mb-4 w-full px-6">
                      <h5 className="mb-4 font-medium">Recomendaciones</h5>
                      <Controller
                        control={form.control}
                        name="recomendacion"
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Recomendaciones"
                            readOnly
                          />
                        )}
                      />
                    </div>
                  )}

                <div className="w-full max-w-md text-center">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-500 max-sm:mb-8"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>

            {/* Botones del modal */}
            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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

export default ModalCreateHerramienta;

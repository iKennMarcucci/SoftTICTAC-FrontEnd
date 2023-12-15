import { useState } from "react";
import Select from "react-select";
import SelectComponent from "react-select";
import { SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { usePlanes } from "@/Contextos/ModuleContexts/PlanesContext";
import Alert from "@/Alertas/Alert";
import { isDocente, isLider } from "@/utils/User";
import { useAuth } from "@/Contextos/AuthContext";
import { Status } from "@/types/Status";
import { Controller, useForm } from "react-hook-form";
import { ejes } from "@/utils/ejes";
import { poblaciones } from "@/utils/poblaciones";
import {
  approvePlanes,
  rejectPlanes,
  updatePlanes,
} from "@/Api/Peticiones/request.axios";

function ModalCreatePlanes({ initialValues, isOpen, onClose }) {
  const { user } = useAuth();
  const { sendPlanes } = usePlanes();

  const form = useForm({
    values: initialValues,
    defaultValues: initialValues,
  });

  const [alert, setAlert] = useState(null);

  const type = form.watch("type");

  function handleApprove() {
    approvePlanes(initialValues.id)
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

    rejectPlanes(initialValues.id, recomendacion)
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
        response = await updatePlanes(initialValues.id, formData);
      } else {
        response = await sendPlanes(data);
      }

      if (response.status === 200) {
        setAlert({
          title: "Plan Creado",
          desc: "Has creado un plan. Espera a que el Líder PPT lo revise y decida su publicación, o te proporcione retroalimentación.",
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
      
      <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <h4 className="my-4 text-center text-2xl font-medium">
              Crear Plan de Trabajo
            </h4>
      <div className="modal-content bg-white p-8 shadow rounded-lg">
        <Select>
          <SelectTrigger id="year">
            <SelectValue placeholder="Elegir" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Linea PPT" />
      </div>
      <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actividad</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha cierre</TableHead>
                <TableHead>Docentes apoyo</TableHead>
                <TableHead>Cumplimientos</TableHead>
                <TableHead>Observaciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input placeholder="Actividad 1" />
                </TableCell>
                <TableCell>
                  {/* Input para fecha de inicio */}
                  <Input type="date" />
                </TableCell>
                <TableCell>
                  {/* Input para fecha de cierre */}
                  <Input type="date" value={new Date().toISOString().split('T')[0]} />
                </TableCell>
                <TableCell>
                  <Input placeholder="Docente apoyo" />
                </TableCell>
                <TableCell>
                  {/* Input para cumplimientos */}
                  <Input id="activity1-completion" type="checkbox" />
                </TableCell>
                <TableCell>
                  <Input placeholder="Observación 1" />
                </TableCell>
              </TableRow>
              {/* Otras filas de la tabla */}
            </TableBody>
          </Table>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Lecciones aprendidas</h2>
        <Input placeholder="Escribe las lecciones aprendidas" />
      </div>
      <div className="flex items-center mt-4">
    
            <button className="bg-gray-300 px-4 py-2 mt-4" onClick={onClose}>
              Cerrar
            </button>
      </div>
    </div>
    )
  );
}

export default ModalCreatePlanes;

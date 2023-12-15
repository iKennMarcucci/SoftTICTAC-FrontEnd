import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Plus as PlusIcon,
  X as XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createProyecto,
  getProyectoById,
  updateProyecto,
} from "@/Api/Peticiones/request.axios";
import { useAuth } from "@/Contextos/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { isDocente, isLider } from "@/utils/User";
import { ejes } from "@/utils/ejes";
import { Controller, useForm } from "react-hook-form";

/**
 * Componente para crear un proyecto de aula en el panel de control
 */
export function CreateProyectoAulaControl() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const [proyecto, setProyecto] = useState({
    proyecto: {
      id_linea: null,
      nombre: "",
      grado: "",
      // fecha_inicio: format(new Date(), "yyyy-MM-dd"),
    },
    actividades: [],
  });

  const form = useForm({
    values: proyecto,
  });

  const isNew = !params?.id;

  const actividades = form.watch("actividades");
  const allActividadesCompleted = actividades.every((a) => a.cumplimiento);

  function addActividad() {
    const actividades = form.getValues("actividades");

    form.setValue("actividades", [
      ...actividades,
      {
        nombre: "",
        descripcion: "Descripción",
        fecha_inicio: null,
        fecha_cierre: null,
        estudiantes: "",
        cumplimiento: false,
        observaciones: "Observaciones",
        lecciones_aprendidas: "",
      },
    ]);
  }

  function removeActividad(index) {
    const actividades = form.getValues("actividades");

    form.setValue(
      "actividades",
      actividades.filter((_, i) => i !== index),
    );
  }

  function saveProyecto(values) {
    let request;

    if (isNew) {
      request = createProyecto(values);
    } else {
      request = updateProyecto(params.id, values);
    }

    request
      .then(() => {
        navigate("/controlpanel/proyectos-aula", { relative: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (!params?.id) return;

    getProyectoById(params.id)
      .then((response) => {
        const { actividades, ...proyecto } = response.data;

        setProyecto({
          actividades,
          proyecto,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params?.id]);

  useEffect(() => {
    if (isLider(user)) {
      form.setValue("proyecto.id_linea", user.information.user_type);
    }
  }, [user, form]);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Crear proyecto de aula</h1>
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <form onSubmit={form.handleSubmit(saveProyecto)}>
        <div className="mb-4 flex gap-4">
          <Input
            {...form.register("proyecto.nombre")}
            placeholder={"Nombre del proyecto"}
            required
          />
          <Input
            {...form.register("proyecto.grado")}
            placeholder={"Grado"}
            required
          />
          {isDocente(user) && (
            <Controller
              name="proyecto.id_linea"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    form.setValue(field.name, Number(value));
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un eje" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Eje</SelectLabel>
                      <SelectItem value={null}>Seleccione un eje</SelectItem>
                      {ejes.map((eje) => (
                        <SelectItem key={eje.value} value={eje.value}>
                          {eje.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>
        <h2 className="my-4 text-xl font-medium">Actividades</h2>
        <Button
          type={"button"}
          size={"icon"}
          className={"mb-4"}
          onClick={addActividad}
        >
          <PlusIcon />
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actividad</TableHead>
              <TableHead>Fecha inicio</TableHead>
              <TableHead>Fecha cierre</TableHead>
              <TableHead>Estudiantes de apoyo</TableHead>
              <TableHead>Cumplimiento</TableHead>
              <TableHead>Observaciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actividades.map((_invoice, index) => (
              <TableRow key={index}>
                <TableCell className="text-center font-medium">
                  <Controller
                    name={`actividades.${index}.nombre`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={"Nombre de la actividad"}
                        required
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`actividades.${index}.fecha_inicio`}
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(
                                typeof field.value === "string"
                                  ? parseISO(field.value)
                                  : field.value,
                                "PPP",
                                { locale: es },
                              )
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              typeof field.value === "string"
                                ? parseISO(field.value)
                                : field.value
                            }
                            onSelect={(date) => {
                              form.setValue(
                                field.name,
                                format(date, "yyyy-MM-dd"),
                              );
                            }}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`actividades.${index}.fecha_cierre`}
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP", { locale: es })
                            ) : (
                              <span>Seleccione una fecha</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    {...form.register(`actividades.${index}.estudiantes`)}
                    placeholder={"Estudiantes de apoyo"}
                    required
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`actividades.${index}.cumplimiento`}
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) =>
                          form.setValue(field.name, value)
                        }
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name={`actividades.${index}.observaciones`}
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={"Observaciones"}
                        disabled={
                          !form.watch(`actividades.${index}.cumplimiento`)
                        }
                        required={form.watch(
                          `actividades.${index}.cumplimiento`,
                        )}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type={"button"}
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => removeActividad(index)}
                  >
                    <XIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h2 className="my-4 text-xl font-medium">Lecciones aprendidas</h2>
        <Textarea
          {...form.register("proyecto.lecciones_aprendidas")}
          placeholder={"Escriba aquí las lecciones aprendidas"}
          disabled={!allActividadesCompleted}
          required={allActividadesCompleted}
        />
        <Button type={"submit"} className={"mt-4"}>
          Guardar
        </Button>
      </form>
    </main>
  );
}

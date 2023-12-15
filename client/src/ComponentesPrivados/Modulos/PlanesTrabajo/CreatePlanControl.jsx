import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Plus as PlusIcon,
  X as XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  createPlan,
  getPlanById,
  updatePlan,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { isLider } from "@/utils/User";

/**
 * Componente para crear un plan de trabajo en el panel de control
 */
export function CreatePlanControl() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const [plan, setPlan] = useState({
    plan: {
      id_linea: null,
      nombre: "",
      año: "",
      lecciones_aprendidas: "No aplica",
    },
    actividades: [],
  });

  const form = useForm({
    values: plan,
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
        docentes: "",
        cumplimiento: false,
        observaciones: "Observaciones",
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

  function savePlan(values) {
    let request;

    // console.log(values);

    // return;

    if (isNew) {
      request = createPlan(values);
    } else {
      request = updatePlan(params.id, values);
    }

    request
      .then(() => {
        navigate("/controlpanel/planes-trabajo", { relative: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    if (!params?.id) return;

    getPlanById(params.id)
      .then((response) => {
        const { actividades, ...plan } = response.data;

        setPlan({
          actividades,
          plan,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params?.id]);

  useEffect(() => {
    if (isLider(user)) {
      form.setValue("plan.id_linea", Number(user.information.user_type));
    }
  }, [user, form]);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Crear plan de trabajo</h1>
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <form onSubmit={form.handleSubmit(savePlan)}>
        <div className="mb-4 flex gap-4">
          <Input
            {...form.register("plan.nombre")}
            placeholder={"Nombre del plan"}
            required
          />
          <Input
            {...form.register("plan.año")}
            placeholder={"Año"}
            required
            maxLength={4}
          />
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
              <TableHead>Docentes de apoyo</TableHead>
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
                            init
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
                    {...form.register(`actividades.${index}.docentes`)}
                    placeholder={"Docentes de apoyo"}
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
          {...form.register("plan.lecciones_aprendidas")}
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

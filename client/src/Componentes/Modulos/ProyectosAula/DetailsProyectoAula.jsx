import { Controller, useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPublicProyectoById } from "@/Api/Peticiones/request.axios";
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
import { ejes } from "@/utils/ejes";

/**
 * Componente para crear un proyecto de aula en el panel de control
 */
export function DetailsProyectoAula() {
  const params = useParams();

  const [proyecto, setProyecto] = useState({
    proyecto: {
      id_linea: null,
      nombre: "",
      grado: "",
      fecha_inicio: format(new Date(), "yyyy-MM-dd"),
    },
    actividades: [],
  });

  const form = useForm({
    values: proyecto,
  });

  const actividades = form.watch("actividades");

  useEffect(() => {
    if (!params?.id) return;

    getPublicProyectoById(params.id)
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

  return (
    <main className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Crear proyecto de aula</h1>
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="mb-4 flex gap-4">
        <Input
          {...form.register("proyecto.nombre")}
          placeholder={"Nombre del proyecto"}
          readOnly
        />
        <Input
          {...form.register("proyecto.grado")}
          placeholder={"Grado"}
          readOnly
        />
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
              <SelectTrigger disabled>
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
      </div>
      <h2 className="my-4 text-xl font-medium">Actividades</h2>

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
                      readOnly
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
                          disabled
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
                  readOnly
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
                      disabled
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <Controller
                  name={`actividades.${index}.observaciones`}
                  control={form.control}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Observaciones"} disabled />
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="my-4 text-xl font-medium">Lecciones aprendidas</h2>
      <Textarea
        {...form.register("proyecto.lecciones_aprendidas")}
        placeholder={"Escriba aquí las lecciones aprendidas"}
        disabled
      />
    </main>
  );
}

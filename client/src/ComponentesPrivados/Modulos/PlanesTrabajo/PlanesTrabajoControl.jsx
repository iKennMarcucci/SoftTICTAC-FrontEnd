import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllPlanes } from "@/Api/Peticiones/request.axios";
import { SelectEjes } from "@/Componentes/SelectEjes";
import { useAuth } from "@/Contextos/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isDocente, isLider } from "@/utils/User";
import { ejes } from "@/utils/ejes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Componente para los planes de trabajo en el panel de control
 */
export function PlanesTrabajoControl() {
  const { user } = useAuth();
  const [planes, setPlanes] = useState([]);
  const [eje, setEje] = useState(null);
  const [year, setYear] = useState(null);

  const years = [...new Set(planes.map((plan) => plan["año"]))];

  const filteredPlanes = planes
    .filter((plan) => {
      // Si es lider de linea, solo puede ver los planes de su linea
      if (isLider(user)) {
        return Number(plan.id_linea) === Number(user.information.user_type);
      }

      if (eje === null) return true;

      return plan.id_linea === eje;
    })
    .filter((plan) => {
      if (!year) return true;

      return plan["año"] === year;
    });

  useEffect(() => {
    getAllPlanes()
      .then((response) => setPlanes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Planes de trabajo</h1>
        {isLider(user) && (
          <Link to={"crear"}>
            <Button>Crear plan</Button>
          </Link>
        )}
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="my-4 flex justify-end">
        {isDocente(user) && <SelectEjes value={eje} onValueChange={setEje} />}
        <Select onValueChange={setYear} value={year}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccione un año" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Año</SelectLabel>
              <SelectItem value={null}>Todos los años</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Table>
        {isLider(user) && (
          <TableCaption>
            Listado de planes de trabajo asociados a su eje
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del plan</TableHead>
            <TableHead>Línea PPT</TableHead>
            <TableHead>Año</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlanes.map((proyecto) => {
            const { label } = ejes.find(
              (eje) => eje.value === proyecto.id_linea,
            );

            return (
              <TableRow key={proyecto.id}>
                <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                <TableCell>{label}</TableCell>
                <TableCell>{proyecto["año"]}</TableCell>
                <TableCell>
                  <Link to={`${proyecto.id}`}>
                    <Button variant={"outline"} size={"icon"}>
                      <Eye />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getPublicProyectos } from "@/Api/Peticiones/request.axios";
import { ejes } from "@/utils/ejes";
import { Eye } from "lucide-react";
import { SelectEjes } from "@/Componentes/SelectEjes";

/**
 * Componente para los proyectos de aula
 */
export function ProyectosAula() {
  const [proyectos, setProyectos] = useState([]);
  const [eje, setEje] = useState(null);

  const filteredProyectos = proyectos.filter((proyecto) => {
    if (eje === null) return true;

    return proyecto.id_linea === eje;
  });

  useEffect(() => {
    getPublicProyectos()
      .then((response) => setProyectos(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Proyectos de aula</h1>
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      <div className="my-4 flex justify-end">
        <SelectEjes value={eje} onValueChange={setEje} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del proyecto</TableHead>
            <TableHead>Línea PPT</TableHead>
            <TableHead>Grado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProyectos.map((proyecto) => {
            const { label } = ejes.find(
              (eje) => eje.value === proyecto.id_linea,
            );

            return (
              <TableRow key={proyecto.id}>
                <TableCell className="font-medium">{proyecto.nombre}</TableCell>
                <TableCell>{label}</TableCell>
                <TableCell>{proyecto.grado}</TableCell>
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

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getAllProyectos } from "@/Api/Peticiones/request.axios";
import { ejes } from "@/utils/ejes";
import { Eye } from "lucide-react";
import { SelectEjes } from "@/Componentes/SelectEjes";
import { useAuth } from "@/Contextos/AuthContext";
import { isDocente, isLider } from "@/utils/User";

/**
 * Componente para los proyectos de aula en el panel de control
 */
export function ProyectosAulaControl() {
  const { user } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [eje, setEje] = useState(null);

  const filteredProyectos = proyectos.filter((proyecto) => {
    // Si es lider de linea, solo puede ver los proyectos de su linea
    if (isLider(user)) return proyecto.id_linea === user.information.user_type;

    if (eje === null) return true;

    return proyecto.id_linea === eje;
  });

  useEffect(() => {
    getAllProyectos()
      .then((response) => setProyectos(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Proyectos de aula</h1>
        {(isLider(user) || isDocente(user)) && (
          <Link to={"crear"}>
            <Button>Crear proyecto</Button>
          </Link>
        )}
      </div>
      <hr className="mb-4 mt-2 border-stone-400 max-sm:mx-2" />
      {isDocente(user) && (
        <div className="my-4 flex justify-end">
          <SelectEjes value={eje} onValueChange={setEje} />
        </div>
      )}
      <Table>
        {isLider(user) && (
          <TableCaption>
            Listado de proyectos de aula asociados a su eje
          </TableCaption>
        )}
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

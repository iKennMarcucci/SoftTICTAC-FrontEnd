import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import {
  getEstadisticasContenidos,
  getEstadisticasHerramientas,
  getEstadisticasProyectos,
  getEstadisticasTopContenidos,
  getEstadisticasTopHerramientas,
  getEstadisticasTopProyectos,
} from "@/Api/Peticiones/request.axios";
import { ejes } from "@/utils/ejes";

const pieChartsOptions = {
  labels: ejes.map((eje) => eje.label),
  dataLabels: {
    formatter: function (val) {
      return Math.round(val) + "%";
    },
  },
};

export function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState({
    herramientas: [],
    contenidos: [],
    proyectos: [],
    topHerramientas: [],
    topContenidos: [],
    topProyectos: [],
  });

  useEffect(() => {
    const promises = [
      getEstadisticasHerramientas(),
      getEstadisticasContenidos(),
      getEstadisticasProyectos(),
      getEstadisticasTopHerramientas(),
      getEstadisticasTopContenidos(),
      getEstadisticasTopProyectos(),
    ];

    Promise.allSettled(promises)
      .then((results) => {
        const [
          herramientas,
          contenidos,
          proyectos,
          topHerramientas,
          topContenidos,
          topProyectos,
        ] = results
          .filter((result) => result.status === "fulfilled")
          .map((results) => results.value.data);

        setEstadisticas({
          herramientas,
          contenidos,
          proyectos,
          topHerramientas,
          topContenidos,
          topProyectos,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="grid grid-cols-3 gap-10 p-10">
      <Chart
        type="pie"
        options={{
          ...pieChartsOptions,
          title: { text: "Herramientas pedagógicas" },
        }}
        series={Object.values(estadisticas.herramientas)}
      />
      <Chart
        type="pie"
        options={{
          ...pieChartsOptions,
          title: { text: "Contenidos digitales" },
        }}
        series={Object.values(estadisticas.contenidos)}
      />
      <Chart
        type="pie"
        options={{ ...pieChartsOptions, title: { text: "Proyectos de aula" } }}
        series={Object.values(estadisticas.proyectos)}
      />

      <Chart
        type="bar"
        options={{
          title: { text: "Top docentes con más herramientas pedagógicas" },
          xaxis: {
            categories: [""],
          },
        }}
        series={estadisticas.topHerramientas.map((h) => ({
          name: `${h.user.nombre} ${h.user.apellido}`,
          data: [h.total_herramientas],
        }))}
      />

      <Chart
        type="bar"
        options={{
          title: { text: "Top docentes con más contenidos digitales" },
          xaxis: {
            categories: [""],
          },
        }}
        series={estadisticas.topContenidos.map((h) => ({
          name: `${h.user.nombre} ${h.user.apellido}`,
          data: [h.total_contenidos],
        }))}
      />

      <Chart
        type="bar"
        options={{
          title: { text: "Top docentes con más proyectos de aula" },
          xaxis: {
            categories: [""],
          },
        }}
        series={estadisticas.topProyectos.map((h) => ({
          name: `${h.user.nombre} ${h.user.apellido}`,
          data: [h.total_proyectos],
        }))}
      />
    </main>
  );
}

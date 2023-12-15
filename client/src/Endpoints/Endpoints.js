export const endpoints = {
  URL_API:
    import.meta.env.VITE_API_URL ?? "https://apisoftictac.calzadoan.com/api",
  LOGIN: "auth/token/",
  REFRESH: "/auth/token/refresh/",
  PROFILE: "/user/",
  PUBLIC_CONTENIDOS: "/contenidos/publico/",
  PRIVATE_CONTENIDOS: "/contenidos/contenido/",
  CREATE_CONTENIDOS: "/contenidos/contenido/",
  PUBLIC_HERRAMIENTAS: "/herramientas/publico/",
  PRIVATE_HERRAMIENTAS: "/herramientas/herramienta",
  CREATE_HERRAMIENTAS: "/herramientas/herramienta/",
  UPDATE_HERRAMIENTAS: "/herramientas/update",

  //Planes
  PRIVATE_PLANES: "/plantrabajo/plan",

  GET_EJES: "/shared/lineas/",
  GET_POBLACIONES: "shared/poblaciones/",

  // Proyectos de aula
  PRIVATE_PROYECTOS: "/proyectoaula/proyecto",
  PUBLIC_PROYECTOS: "/proyectoaula/publico",

  // Estadisticas
  ESTADISTICAS_PROYECTOS: "/estadisticas/proyectos/",
  ESTADISTICAS_HERRAMIENTAS: "/estadisticas/herramientas/",
  ESTADISTICAS_CONTENIDOS: "/estadisticas/contenidos/",
  ESTADISTICAS_TOP_PROYECTOS: "/estadisticas/topproyectos/",
  ESTADISTICAS_TOP_CONTENIDOS: "/estadisticas/topcontenidos/",
  ESTADISTICAS_TOP_HERRAMIENTAS: "/estadisticas/topherramientas/",
};

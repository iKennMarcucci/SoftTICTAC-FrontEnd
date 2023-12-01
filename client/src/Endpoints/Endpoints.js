export const endpoints = {
  URL_API: import.meta.env.VITE_API_URL,
  LOGIN: "auth/token/",
  REFRESH: "/auth/token/refresh/",
  PROFILE: "/user/",
  PUBLIC_CONTENIDOS: "/contenidos/publico/",
  PRIVATE_CONTENIDOS: "/contenidos/contenido/",
  CREATE_CONTENIDOS: "/contenidos/contenido/",
  PUBLIC_HERRAMIENTAS: "/herramientas/publico/",
  PRIVATE_HERRAMIENTAS: "/herramientas/herramienta",
  CREATE_HERRAMIENTAS: "/herramientas/herramienta/",
  GET_EJES: "/shared/lineas/",
  GET_POBLACIONES: "shared/poblaciones/",
};

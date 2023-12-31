import { backendAPI } from "../backendAPI.axios";
import { endpoints } from "../../Endpoints/Endpoints";
import { Status } from "@/types/Status";

// Contenidos Digitales
export const getContenidosRequest = () =>
  backendAPI.get(endpoints.PUBLIC_CONTENIDOS);

export function getContenidosPendientes() {
  return backendAPI.get(`${endpoints.PRIVATE_CONTENIDOS}?estado=Pendiente`);
}

export function getContenidosByStatus(status) {
  return backendAPI.get(`${endpoints.PRIVATE_CONTENIDOS}?estado=${status}`);
}

export const sendContenidosRequest = (body) =>
  backendAPI.post(endpoints.CREATE_CONTENIDOS, body);

export function updateContenido(id, body) {
  return backendAPI.patch(`${endpoints.PRIVATE_CONTENIDOS}/${id}/`, body);
}

export function approveContenido(id) {
  return backendAPI.patch(`${endpoints.PRIVATE_CONTENIDOS}/${id}/`, {
    estado: "Aprobado",
    revision: "Aprobado",
  });
}

export function rejectContenido(id, recomendacion) {
  return backendAPI.patch(`${endpoints.PRIVATE_CONTENIDOS}/${id}/`, {
    estado: "Rechazado",
    recomendacion: recomendacion,
  });
}

//Planes
export const getAllPlanes = () =>
  backendAPI.get(`${endpoints.PRIVATE_PLANES}/`);

export function getPlanById(id) {
  return backendAPI.get(`${endpoints.PRIVATE_PLANES}/${id}/`);
}

export function createPlan(body) {
  return backendAPI.post(`${endpoints.PRIVATE_PLANES}/`, body);
}

export function updatePlan(id, body) {
  return backendAPI.patch(`${endpoints.PRIVATE_PLANES}/${id}/`, body);
}

// Herramientas Pedagógicas
export const getHerramientasRequest = () =>
  backendAPI.get(endpoints.PUBLIC_HERRAMIENTAS);

/**
 * Consulta las herramientas pendientes de revisión por el líder PPT
 * @returns
 */
export function getHerramientasPendientes() {
  return backendAPI.get(
    `${endpoints.PRIVATE_HERRAMIENTAS}/?estado=${Status.PENDIENTE}`,
  );
}

/**
 * Filtra las herramientas pedagógicas por status
 * @param {"Aprobado" | "Pendiente" | "Rechazado"} status para filtrar
 * @returns {Promise<{ data: unknown }>} Petición a la API
 */
export function getHerramientasByStatus(status) {
  return backendAPI.get(`${endpoints.PRIVATE_HERRAMIENTAS}/?estado=${status}`);
}

export const sendHerramientasRequest = (body) => {
  return backendAPI.post(endpoints.CREATE_HERRAMIENTAS, body);
};

export function updateHerramienta(id, body) {
  return backendAPI.put(`${endpoints.UPDATE_HERRAMIENTAS}/${id}/`, body);
}

/**
 * Aprobación de una herramienta por parte del líder PPT
 * @param {number} id de la herramienta a aprobar
 * @returns
 */
export function approveHerramienta(id) {
  return backendAPI.patch(`${endpoints.PRIVATE_HERRAMIENTAS}/${id}/`, {
    estado: "Aprobado",
    revision: "Aprobado",
  });
}

/**
 * Rechazo de una herramienta por parte del líder PPT
 * @param {number} id de la herramienta a aprobar
 * @param {string} recomendación del líder PPT
 * @returns
 */
export function rejectHerramienta(id, recomendacion) {
  return backendAPI.patch(`${endpoints.PRIVATE_HERRAMIENTAS}/${id}/`, {
    estado: "Rechazado",
    revision: recomendacion,
  });
}

// Proyectos de aula

export function createProyecto(body) {
  return backendAPI.post(`${endpoints.PRIVATE_PROYECTOS}/`, body);
}

export function updateProyecto(id, body) {
  return backendAPI.patch(`${endpoints.PRIVATE_PROYECTOS}/${id}/`, body);
}

export function getAllProyectos() {
  return backendAPI.get(`${endpoints.PRIVATE_PROYECTOS}/`);
}

export function getProyectoById(id) {
  return backendAPI.get(`${endpoints.PRIVATE_PROYECTOS}/${id}/`);
}

export function getPublicProyectos() {
  return backendAPI.get(`${endpoints.PUBLIC_PROYECTOS}/`);
}

export function getPublicProyectoById(id) {
  return backendAPI.get(`${endpoints.PUBLIC_PROYECTOS}/${id}/`);
}

// Items Shared
export const getEjesRequest = () => backendAPI.get(endpoints.GET_EJES);

export const getPoblacionesRequest = () =>
  backendAPI.get(endpoints.GET_POBLACIONES);

// Auth
export const loginRequest = (body) => backendAPI.post(endpoints.LOGIN, body);

export const validateTokenRequest = () => backendAPI.get(endpoints.PROFILE);

// Estadisticas

export function getEstadisticasProyectos() {
  return backendAPI.get(endpoints.ESTADISTICAS_PROYECTOS);
}

export function getEstadisticasHerramientas() {
  return backendAPI.get(endpoints.ESTADISTICAS_HERRAMIENTAS);
}

export function getEstadisticasContenidos() {
  return backendAPI.get(endpoints.ESTADISTICAS_CONTENIDOS);
}

export function getEstadisticasTopProyectos() {
  return backendAPI.get(endpoints.ESTADISTICAS_TOP_PROYECTOS);
}

export function getEstadisticasTopContenidos() {
  return backendAPI.get(endpoints.ESTADISTICAS_TOP_CONTENIDOS);
}

export function getEstadisticasTopHerramientas() {
  return backendAPI.get(endpoints.ESTADISTICAS_TOP_HERRAMIENTAS);
}

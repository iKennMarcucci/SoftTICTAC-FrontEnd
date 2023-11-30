import { backendAPI } from "../backendAPI.axios";
import { endpoints } from "../../Endpoints/Endpoints";
import { Status } from "@/types/Status";

// Contenidos Digitales
export const getContenidosRequest = () =>
  backendAPI.get(endpoints.PUBLIC_CONTENIDOS);

export function getContenidosPendientes() {
  return backendAPI.get(`${endpoints.PRIVATE_CONTENIDOS}?estado=Pendiente`);
}

export const sendContenidosRequest = (body) =>
  backendAPI.post(endpoints.CREATE_CONTENIDOS, body);

// Herramientas Pedagógicas
export const getHerramientasRequest = () =>
  backendAPI.get(endpoints.PUBLIC_HERRAMIENTAS);

/**
 * Consulta las herramientas pendientes de revisión por el líder PPT
 * @returns
 */
export function getHerramientasPendientes() {
  return backendAPI.get(
    `${endpoints.PRIVATE_HERRAMIENTAS}/?estado=${Status.PENDIENTE}`
  );
}

export const sendHerramientasRequest = (body) => {
  return backendAPI.post(endpoints.CREATE_HERRAMIENTAS, body);
};

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

// Items Shared
export const getEjesRequest = () => backendAPI.get(endpoints.GET_EJES);

export const getPoblacionesRequest = () =>
  backendAPI.get(endpoints.GET_POBLACIONES);

// Auth
export const loginRequest = (body) => backendAPI.post(endpoints.LOGIN, body);

export const validateTokenRequest = () => backendAPI.get(endpoints.PROFILE);

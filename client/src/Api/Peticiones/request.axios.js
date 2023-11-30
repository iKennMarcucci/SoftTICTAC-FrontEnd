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

export function getHerramientasPendientes() {
  return backendAPI.get(
    `${endpoints.PRIVATE_HERRAMIENTAS}?estado=${Status.PENDIENTE}`
  );
}

export const sendHerramientasRequest = (body) => {
  return backendAPI.post(endpoints.CREATE_HERRAMIENTAS, body);
};

// Items Shared
export const getEjesRequest = () => backendAPI.get(endpoints.GET_EJES);

export const getPoblacionesRequest = () =>
  backendAPI.get(endpoints.GET_POBLACIONES);

// Auth
export const loginRequest = (body) => backendAPI.post(endpoints.LOGIN, body);

export const validateTokenRequest = () => backendAPI.get(endpoints.PROFILE);

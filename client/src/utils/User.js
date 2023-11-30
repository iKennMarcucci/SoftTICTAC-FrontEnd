import { RolesTitles, UserRoles } from "@/types/User";

/**
 * Comprueba si el usuario es un líder PPT
 * @param {*} user
 * @returns
 */
export function isLider(user) {
  return Number(user?.information.user_type) === UserRoles.LIDER;
}

export function isDocente(user) {
  return Number(user?.information.user_type) === UserRoles.DOCENTE;
}

export function getRole(user) {
  return RolesTitles[user?.information.user_type] ?? "Desconocido";
}

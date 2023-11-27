export const UserRoles = {
  LIDER: 2,
  DOCENTE: 3,
};

const RolesTitles = {
  [UserRoles.LIDER]: "Líder PPT",
  [UserRoles.DOCENTE]: "Docente",
};

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

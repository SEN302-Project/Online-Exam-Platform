export const ROLES = {
  SYSTEM_ADMIN: "system_admin",
  INSTITUTION_ADMIN: "institution_admin",
  INSTRUCTOR: "instructor",
  PROCTOR: "proctor",
  STUDENT: "student",
};

export const ROLE_HOMES = {
  [ROLES.SYSTEM_ADMIN]: "/admin",
  [ROLES.INSTITUTION_ADMIN]: "/admin",
  [ROLES.INSTRUCTOR]: "/instructor",
  [ROLES.PROCTOR]: "/proctor",
  [ROLES.STUDENT]: "/student",
};

export function hasRole(user, allowedRoles) {
  if (!user) return false;
  if (!Array.isArray(allowedRoles)) allowedRoles = [allowedRoles];
  return allowedRoles.includes(user.role);
}

export function roleLabel(role) {
  return (
    {
      [ROLES.SYSTEM_ADMIN]: "System Administrator",
      [ROLES.INSTITUTION_ADMIN]: "Institution Administrator",
      [ROLES.INSTRUCTOR]: "Instructor",
      [ROLES.PROCTOR]: "Proctor",
      [ROLES.STUDENT]: "Student",
    }[role] || role
  );
}
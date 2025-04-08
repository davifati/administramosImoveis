export const departments: { value: string; label: string }[] = [
  {
    value: "administrador",
    label: "Administrador", // all
  },
  {
    value: "gerente",
    label: "Gerente", // imobiliarias abaixo dele
  },
  {
    value: "admin",
    label: "Administrativo", // imobiliarias dele
  },
]

export const roles: { value: string; label: string }[] = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "member",
    label: "Member",
  },
  {
    value: "viewer",
    label: "Viewer",
  },
  {
    value: "contributor",
    label: "Contributor",
  },
]

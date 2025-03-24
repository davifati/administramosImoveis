import { saasName, saasSlogan } from "./constant"

export const siteConfig = {
  name: saasName,
  url: "",
  description: saasSlogan,
  baseLinks: {
    reports: "/financeiro",
    transactions: "/transactions",
    settings: {
      audit: "/operacional/monitor",
      users: "/operacional/users",
    },
    monitor: {
      historicalView: "/operacional/historico",
      dailyView: "/operacional/diario",
      alarm: "/operacional/alertas",
    },
    admin: "/admin",
    users: "/admin/usuarios",
    login: "/login",
    tellus: "/fale-conosco",
    imoveis: "/imoveis",
    financial: "/financeiro"
  },
}

export type siteConfig = typeof siteConfig

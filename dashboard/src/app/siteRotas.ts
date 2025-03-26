import { LOCALHOST, saasName, saasSlogan } from "./constant"



export const siteConfig = {
  name: saasName,
  url: LOCALHOST,
  description: saasSlogan,
  baseLinks: {
    home: "/home",
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
    admin: "/login",
    users: "/admin/usuarios",
    login: "/login",
    tellus: "/fale-conosco",
    imoveis: "/imoveis",
    financial: "/financeiro",
  },
}

export type siteConfig = typeof siteConfig

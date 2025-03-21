import { saasName } from "./const"

export const siteConfig = {
  name: saasName,
  url: "https://insights.tremor.so",
  description: "The only reporting and audit dashboard you will ever need.",
  baseLinks: {
    reports: "/financeiro",
    transactions: "/transactions",
    settings: {
      audit: "/operacional/monitor",
      users: "/operacional/users",
      billing: "/operacional/users",
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

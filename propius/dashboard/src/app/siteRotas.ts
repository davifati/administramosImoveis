import { LOCALHOST, saasName, saasSlogan } from "./constant"



export const siteConfig = {
  name: saasName,
  url: LOCALHOST,
  description: saasSlogan,
  whatsappTellUs: "https://wa.me/15551234567",

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
    admin: `${process.env.NEXT_PUBLIC_API_HOST}/admin`,
    users: "/admin/usuarios",
    login: "/login",
    tellus: "/fale-conosco",
    imoveis: "/imoveis",
    financial: "/financeiro",
  },
}

export type siteConfig = typeof siteConfig

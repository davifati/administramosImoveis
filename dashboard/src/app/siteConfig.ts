export const siteConfig = {
  name: "Insights",
  url: "https://insights.tremor.so",
  description: "The only reporting and audit dashboard you will ever need.",
  baseLinks: {
    reports: "/reports",
    transactions: "/transactions",
    settings: {
      audit: "/operacional/monitor",
      users: "/operacional/users",
      billing: "/operacional/users",
    },
    login: "/login",
    tellus: "/fale-conosco",
  },
}

export type siteConfig = typeof siteConfig



export const falhasBotsImobiliaria= [
    {
        nome: "APSA",
        totalExtracoes: 150,
        falhas: 15,
        taxaFalha: 10,
        dadosFalhas: [
            { data: "2025-03-10", motivo: "Página não carregada" },
            { data: "2025-03-12", motivo: "Erro de conexão" },
            { data: "2025-03-14", motivo: "Timeout da API" },
        ],
    },
    {
        nome: "ABRJ",
        totalExtracoes: 120,
        falhas: 24,
        taxaFalha: 20,
        dadosFalhas: [
            { data: "2025-03-11", motivo: "Nao foi possivel extrair os dados do boleto" },
            { data: "2025-03-13", motivo: "Login e/ou Senha Invalido" },
            { data: "2025-03-15", motivo: "Erro de sistema" },
        ],
    },
    {
        nome: "BCF",
        totalExtracoes: 180,
        falhas: 9,
        taxaFalha: 5,
        dadosFalhas: [
            { data: "2025-03-09", motivo: "Login e/ou Senha Invalido" },
            { data: "2025-03-10", motivo: "Tempo de resposta excedido" },
            { data: "2025-03-13", motivo: "Site Fora do Ar" },
        ],
    },
    {
        nome: "PROTEL",
        totalExtracoes: 100,
        falhas: 20,
        taxaFalha: 20,
        dadosFalhas: [
            { data: "2025-03-07", motivo: "Erro de dados incompletos" },
            { data: "2025-03-10", motivo: "Conflito de versão de API" },
            { data: "2025-03-13", motivo: "Problema de rede" },
        ],
    },
];

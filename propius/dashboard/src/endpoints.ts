export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';


const ENDPOINTS = {
    // Ativos/Imoveis
    IMOVEIS_ADMINISTRADORAS: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_ADMINISTRADORAS}` || null,
    IMOVEIS_ATIVOS_IMOBILIARIOS_CADASTRO: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_ATIVOS_IMOBILIARIOS_CADASTRO}` || null,
    IMOVEIS_ATIVOS_IMOBILIARIOS_INFO: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_ATIVOS_IMOBILIARIOS_INFO}` || null,
    IMOVEIS_CONDOMINIOS: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_CONDOMINIOS}` || null,
    IMOVEIS_UNIDADES: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_UNIDADES}` || null,

    // Financeiro
    FINANCEIRO_BOLETOS_RANKING: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_BOLETOS_RANKING}` || null,
    FINANCEIRO_REMESSAS_BANCARIAS: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_REMESSAS_BANCARIAS}` || null,
    FINANCEIRO_REMESSAS_BANCARIAS_BOLETOS: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_REMESSAS_BANCARIAS_BOLETOS}` || null,
    FINANCEIRO_PROCESSAR_REMESSA: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_PROCESSAR_REMESSA}` || null,
    FINANCEIRO_PROCESSAR_RETORNO: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_PROCESSAR_RETORNO}` || null,
    FINANCEIRO_VOLUME_HISTORICO: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_VOLUME_HISTORICO}` || null,
    FINANCEIRO_KPI_MENSAL: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_KPI_MENSAL}` || null,

    // Auth
    AUTH_SCHEMA: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_SCHEMA}` || null,
    AUTH_CADASTRO: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_CADASTRO}` || null,
    AUTH_TOKEN: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_TOKEN}` || null,
    AUTH_TOKEN_REFRESH: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_TOKEN_REFRESH}` || null,

    // Monitoramento
    MONITORAMENTO_HISTORICO_EXTRACAO_BOLETOS: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ENDPOINT_MONITORAMENTO_HISTORICO_EXTRACAO_BOLETOS}` || null
};


export const getApiEndpoints = () => {
    const nullEndpoints = Object.entries(ENDPOINTS)
        .filter(([key, value]) => value === null)
        .map(([key]) => key);

    if (nullEndpoints.length > 0) {
        throw new Error(`Missing required API endpoints: ${nullEndpoints.join(', ')}`);
    }

    return ENDPOINTS;
};

export const API_ENDPOINTS = getApiEndpoints();

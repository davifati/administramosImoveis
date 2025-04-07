export interface IExtracao {
    imobiliaria: string;
    ultimaExtracao: string;
    proximaExtracao: string;
    status: "sucesso" | "falha" | "inatividade";
}

interface DadoFalha {
    data: string;
    motivo: string;
}

export interface IFalhaBotImobiliaria {
    nome: string;
    totalExtracoes: number;
    falhas: number;
    taxaFalha: number;
    dadosFalhas: DadoFalha[];
}
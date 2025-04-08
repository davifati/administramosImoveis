export interface BoletosExtracaoInfo {
    imobiliaria: string;
    ultimaExtracao: string;
    proximaExtracao: string;
    status: "sucesso" | "falha" | "inatividade"; // Adicionando "inatividade"
}

export interface ImobiliariaStats {
    [x: string]: any;
    nome: string;
    totalExtracoes: number;
    falhas: number;
    taxaFalha: number;
}

export interface EstatisticasFalhasProps {
    dados?: ImobiliariaStats[];
    titulo?: string;
    mostrarTotal?: boolean;
}
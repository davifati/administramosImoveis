export interface MonthlyStats {
    date: string; // Exemplo: "01/2023"
    Success: number;
    Errors: number;
}

export interface ErrosChartProps {
    data: MonthlyStats[];
}

export interface FalhaDetalhada {
    data: string;
    motivo: string;
}

export interface EstatisticaImobiliaria {
    nome: string;
    taxaFalha: number;
    falhas: number;
    totalExtracoes: number;
    dadosFalhas: FalhaDetalhada[];
}

export interface EstatisticasFalhasProps {
    titulo?: string;
    mostrarTotal?: boolean;
}


export interface FalhaBoleto {
    nome: string;
    dadosFalhas: FalhaDetalhada[];
}

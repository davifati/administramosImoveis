interface Falha {
    data: string;
    motivo: string;
}

export interface IAtivos {
    nome: string;
    site: string;
    unidade: string;
    dadosFalhas: Falha[];
}
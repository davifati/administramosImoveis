export interface Imoveis {

    administradora: {
        id: number;
        nome: string;
        site: string;
        email: string;
        telefones: string;
        created: string;
        updated: string;
        qtdeimoveis: number | null;
    }[];

    administracao: {
        id: number;
        administradoracondominio_id: number;
        nome: string;
        endereco: string;
        complemento_endereco: string;
        numero: string;
        cep: string;
        email: string;
        telefones: string;
        created: string;
        updated: string;
    }[];

    unidade: {
        id: number;
        administracaocondominio_id: number;
        bloco: string;
        num_unidade: string;
        cep: string;
        num_pasta: string;
        documento_proprietario: string;
        nome_proprietario: string;
        login: string;
        senha: string;
        created: string;
        updated: string;
    }[];

    scraper: {
        id: number;
        num_pasta: string;
        endereco_imovel: string;
        data_vencimento: string;
        vlr_boleto: number;
        linha_digitavel: string;
        nome_administradora: string;
        link_pdf_boleto: string;
        created: string;
    }[];
}

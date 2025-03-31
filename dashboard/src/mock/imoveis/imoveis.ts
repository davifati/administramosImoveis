import { Imoveis } from "@/abstract/imoveis/imoveis";

export const mockFullImoveisInfo = [
    {
        administradora: "Alpha", // No modal tem que ter: site, email, quantidade de imoveis, email, login, senha com asteristicos
        administracao: "Barra One", // No modal tem que ter email, telefone, enderecos
        boleto: 13350, // data_vencimento_boleto + valor_boleto + linha_digitavel + link_pdf_boleto
        data_extracao_boletos: "14/10/2024",
        estado: "RJ",
    },
    {
        administradora: "Beta", // site, email, quantidade
        administracao: "Carra One",
        boleto: 14350, // data_vencimento_boleto + valor_boleto + linha_digitavel + link_pdf_boleto
        data_extracao_boletos: "15/10/2024",
        // isso fica abstraido no modal
        //telefone: "contato@alpha.com", //email da administradora, administracao e unidade se houver, abrir um modal
        //enderecos: "", // complemento_endereco + complemento_endereco + numero + cep + bloco + num_unidade + cep_unidade + num_pasta + login e senha (protegida),  administradora, administracao e unidade se houver, abrir um modal
        estado: "RJ",
    },
    {
        administradora: "Ceta", // site, email, quantidade
        administracao: "Darra One",
        boleto: 15350, // data_vencimento_boleto + valor_boleto + linha_digitavel + link_pdf_boleto
        data_extracao_boletos: "16/10/2024",
        // isso fica abstraido no modal
        //telefone: "contato@alpha.com", //email da administradora, administracao e unidade se houver, abrir um modal
        //enderecos: "", // complemento_endereco + complemento_endereco + numero + cep + bloco + num_unidade + cep_unidade + num_pasta + login e senha (protegida),  administradora, administracao e unidade se houver, abrir um modal
        estado: "RJ",
    },
];




type Meta = {
    align: 'text-left' | 'text-right';
};

type Column = {
    header: string;
    accessorKey: string;
    enableSorting: boolean;
    meta: Meta;
};

export const generateTableColumns = (data: Record<string, any>): Column[] => {
    const columns: Column[] = [];

    Object.keys(data).forEach((key) => {
        const header = key
            .replace(/_/g, ' ') // Substitui underscores por espaços
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Adiciona espaço entre palavras concatenadas
            .replace(/^./, (str) => str.toUpperCase()); // Torna a primeira letra maiúscula

        // Adicionar a coluna na lista
        columns.push({
            header: header,
            accessorKey: key, // A chave do objeto será o accessorKey
            enableSorting: true, // Sempre true para enableSorting
            meta: {
                align: 'text-left', // Alinhamento do conteúdo
            },
        });
    });

    return columns;
};

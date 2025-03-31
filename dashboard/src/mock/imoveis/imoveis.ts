import { Imoveis } from "@/abstract/imoveis/imoveis";

export const mockFullImoveisInfo = [
    {
        administradora: "Imobiliária Alpha",
        site: "https://alpha.com",  //email da administradora, administracao e unidade se houver, abrir um modal
        email: "contato@alpha.com", //email da administradora, administracao e unidade se houver, abrir um modal
        telefone: "contato@alpha.com", //email da administradora, administracao e unidade se houver, abrir um modal
        quantidade: 15,
        administracao: "",
        enderecos: "", // complemento_endereco + complemento_endereco + numero + cep + bloco + num_unidade + cep_unidade + num_pasta + login e senha (protegida),  administradora, administracao e unidade se houver, abrir um modal
        boleto: null // data_vencimento_boleto + valor_boleto + linha_digitavel + link_pdf_boleto

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
    // Criando as colunas dinamicamente
    const columns: Column[] = [];

    // Iterar sobre as chaves do objeto 'data' para gerar as colunas
    Object.keys(data).forEach((key) => {
        // Gerar o nome do campo amigável para o header
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

export const workspacesColumns = [
    {
        header: 'Nome da Administradora',
        accessorKey: 'nome',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Site',
        accessorKey: 'site',
        enableSorting: true,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Email',
        accessorKey: 'email',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Telefone',
        accessorKey: 'telefones',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Qtd Imóveis',
        accessorKey: 'qtdeimoveis',
        enableSorting: false,
        meta: {
            align: 'text-left',
        },
    },
    {
        header: 'Criado em',
        accessorKey: 'created',
        enableSorting: false,
        meta: {
            align: 'text-right',
        },
    },
];

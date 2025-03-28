import { Imoveis } from "@/abstract/imoveis/imoveis";

export const ImovelInfo = {
    
}

export const mockImoveis: Imoveis = {
    administradora: [
        {
            id: 1,
            nome: "ABRJ",
            site: "https://abrj.superlogica.net/clients/areadocondomino",
            email: "marcele.triani@abrj.com.br;heloisa.silva@rochameirelles.com.br;contato@abrj.com.br",
            telefones: "3253 7001",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46",
            qtdeimoveis: 10
        },
        {
            id: 2,
            nome: "ACIR",
            site: "https://www.aciradm.com.br/",
            email: "dianakeli@aciradm.com.br",
            telefones: "2212-5300",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46",
            qtdeimoveis: 8
        }
    ],
    administracao: [
        {
            id: 1,
            administradoracondominio_id: 1,
            nome: "Vision Offices",
            endereco: "Av Embaixador Abelardo Bueno",
            complemento_endereco: "",
            numero: "3500",
            cep: "22775-040",
            email: "administracao@visionoffices.com.br",
            telefones: "3613-9401",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46"
        },
        {
            id: 2,
            administradoracondominio_id: 1,
            nome: "Blue Houses",
            endereco: "Rua Dina Sfat",
            complemento_endereco: "",
            numero: "428",
            cep: "22793-338",
            email: "atendimento@associacaoblue.com.br",
            telefones: "2433-7166",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46"
        }
    ],
    unidade: [
        {
            id: 38,
            administracaocondominio_id: 10,
            bloco: "",
            num_unidade: "411",
            cep: "22775-040",
            num_pasta: "617",
            documento_proprietario: "06318832/0001-37",
            nome_proprietario: "FASTDOC DESP.CONSULT. E AUDIT EM",
            login: "administrativo1@administramosimoveis.com.br",
            senha: "Seletto311",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46"
        },
        {
            id: 39,
            administracaocondominio_id: 11,
            bloco: "A",
            num_unidade: "210",
            cep: "22775-050",
            num_pasta: "618",
            documento_proprietario: "08765432/0001-45",
            nome_proprietario: "JOSE SILVA",
            login: "jose.silva@exemplo.com",
            senha: "password123",
            created: "25/02/2025 16:23:46",
            updated: "25/02/2025 16:23:46"
        }
    ],
    scraper: [
        {
            id: 1,
            num_pasta: "41",
            endereco_imovel: "Av das Acacias da Peninsula, Barra da Tijuca, 540, CEP: 22776-000",
            data_vencimento: "10/12/2024",
            vlr_boleto: 3505.06,
            linha_digitavel: "34191090084044361293884756840009699260000350506",
            nome_administradora: "protel",
            link_pdf_boleto: "http://212.56.42.99:5000/files/boleto_4e6a135519064b72bffb6b2ed8b0bde2.pdf",
            created: "26/11/2024 19:36:41"
        },
        {
            id: 2,
            num_pasta: "476",
            endereco_imovel: "Av das Americas, Barra da Tijuca, 3333, CEP: 22631-003",
            data_vencimento: "05/12/2024",
            vlr_boleto: 2198.99,
            linha_digitavel: "34191093625354975293884515290009899210000219899",
            nome_administradora: "protel",
            link_pdf_boleto: "http://212.56.42.99:5000/files/boleto_a1dff0cc27654b90b8dc25c68e2b502c.pdf",
            created: "26/11/2024 19:37:24"
        }
    ]
} ;

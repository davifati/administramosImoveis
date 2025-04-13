import { API_ENDPOINTS } from '@/endpoints';
import axios from 'axios';
import { ExecucaoBot } from '../_abstract/extracao';


export interface FalhaBoleto {
    nome: string; // Nome da administradora
    dadosFalhas: {
        condominio: string;
        data: string; // Vencimento
        valor: number;
        motivo: string;
    }[];
}



export const getBoletoAdministradoraFalhas = async (): Promise<FalhaBoleto[]> => {
    return [
        {
            nome: "Administradora Alpha",
            dadosFalhas: [
                {
                    condominio: "Condomínio Jardim Alpha",
                    data: "2024-04-12",
                    valor: 589.90,
                    motivo: "Erro ao acessar o sistema da administradora",
                },
            ],
        },
        {
            nome: "Administradora Beta",
            dadosFalhas: [
                {
                    condominio: "Residencial Beta Ville",
                    data: "2024-04-12",
                    valor: 420.00,
                    motivo: "Autenticação falhou",
                },
            ],
        },
        {
            nome: "Administradora Gama",
            dadosFalhas: [
                {
                    condominio: "Condomínio Gama Lux",
                    data: "2024-04-10",
                    valor: 710.40,
                    motivo: "Timeout na conexão",
                },
            ],
        },
    ];
};

export const getBoletoAdministradoraFalhas_2 = async (): Promise<FalhaBoleto[]> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_FALHAS_BOLETOS}`;
        const response = await axios.get(url);

        return response.data as FalhaBoleto[];
    } catch (error) {
        console.error('Erro ao buscar falhas de boletos:', error);
        throw new Error('Erro ao buscar falhas de boletos. Verifique o log para mais detalhes.');
    }
};



export const getCronogramaExecucaoBots = async (): Promise<ExecucaoBot> => {
    try {
        const url = API_ENDPOINTS.MONITORAMENTO_CRONOGRAMA_EXECUCAO
        const response = await axios.get(url);
        const data = response.data as ExecucaoBot;
        console.log("000000 > ", data)
        return data
    } catch (error) {
        console.error('Erro ao buscar falhas de boletos:', error);
        throw new Error('Erro ao buscar falhas de boletos. Verifique o log para mais detalhes.');
    }
};
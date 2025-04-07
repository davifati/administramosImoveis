import axios from 'axios';

// Interface do tipo esperado pela API
export interface FalhaBoleto {
    nome: string;
    site: string;
    unidade: string;
    dadosFalhas: {
        data: string;
        motivo: string;
    }[];
}

export const getBoletoAdministradoraFalhas = async (): Promise<FalhaBoleto[]> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_FALHAS_BOLETOS}`;
        const response = await axios.get(url);

        return response.data as FalhaBoleto[];
    } catch (error) {
        console.error('Erro ao buscar falhas de boletos:', error);
        throw new Error('Erro ao buscar falhas de boletos. Verifique o log para mais detalhes.');
    }
};



export const getCronogramaExecucaoBots = async (): Promise<any> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_RELATORIO_CRONOGRAMA_EXECUCAO_BOTS}`;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar falhas de boletos:', error);
        throw new Error('Erro ao buscar falhas de boletos. Verifique o log para mais detalhes.');
    }
};
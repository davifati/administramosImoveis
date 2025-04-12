import axios from 'axios'
import { IExtracao } from '../_abstract/extracao';
import { API_ENDPOINTS } from '@/endpoints';


export const getHistoricalExtractionCalendar = async (): Promise<IExtracao[]> => {
    try {
        const url = API_ENDPOINTS.MONITORAMENTO_HISTORICO_EXTRACAO_BOLETOS;
        const response = await axios.get(url);
        return response.data as IExtracao[];
    } catch (error) {
        console.error('Erro ao buscar calendário de extrações:', error);
        throw new Error('Erro ao buscar calendário de extrações:');
    }
};


export const getFailsExtractionTracker = async (): Promise<any> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_RELATORIO_EXTRACAO_ESTATISTICA_FALHAS}`;
        const response = await axios.get(url);

        return response.data as any;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de falhas:', error);
        throw new Error('Erro ao buscar estatísticas de falhas:');
    }
};


export const getExtractionMonthlyStats = async (): Promise<any> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_RELATORIO_HISTORICO_EXTRACAO_CAPTURA_BOLETOS}`;
        const response = await axios.get(url);

        return response.data as any;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de falhas:', error);
        throw new Error('Erro ao buscar estatísticas de falhas:');
    }
};
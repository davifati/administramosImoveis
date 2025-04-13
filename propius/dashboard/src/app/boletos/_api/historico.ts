import axios from 'axios'
import { IExtracao } from '../_abstract/extracao';
import { API_ENDPOINTS } from '@/endpoints';
import { ErrosChartProps, EstatisticaImobiliaria, MonthlyStats } from '../_abstract/boletos';


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


export const getFailsExtractionTracker = async (): Promise<EstatisticaImobiliaria[]> => {
    try {
        const url = API_ENDPOINTS.MONITORAMENTO_ESTATISTICA_TOTAIS_FALHAS;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de falhas:', error);
        throw new Error('Erro ao buscar estatísticas de falhas:');
    }
};


export const getExtractionMonthlyStats = async (): Promise<MonthlyStats[]> => {
    try {
        const url = API_ENDPOINTS.MONITORAMENTO_ESTATISTICAS_MENSAIS_RESUMO_FALHAS;
        const response = await axios.get(url);
        return response.data as any;
    } catch (error) {
        console.error('Erro ao buscar estatísticas de falhas:', error);
        throw new Error('Erro ao buscar estatísticas de falhas:');
    }
};
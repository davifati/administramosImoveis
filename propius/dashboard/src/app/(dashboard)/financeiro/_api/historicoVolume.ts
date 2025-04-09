import axios from "axios";
import { API_ENDPOINTS } from "@/endpoints";

export const getHistoricoVolumeFinanceiro = async () => {
    try {
        const url = API_ENDPOINTS.FINANCEIRO_VOLUME_HISTORICO;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar getHistoricoVolumeFinanceiro:', error);
        throw new Error('Erro ao buscar getHistoricoVolumeFinanceiro.');
    }
};
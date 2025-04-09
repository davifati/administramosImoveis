import axios from "axios";
import { IKPIMesAnterior } from "../_abstract/KPIMesAnterior";
import { API_ENDPOINTS } from "@/endpoints";

export const getKPIMensal = async () => {
    try {
        const url = API_ENDPOINTS.FINANCEIRO_KPI_MENSAL;
        const response = await axios.get(url);
        return response.data as IKPIMesAnterior[];
    } catch (error) {
        console.error('Erro ao buscar ranking de boletos:', error);
        throw new Error('Erro ao buscar ranking de boletos.');
    }
};
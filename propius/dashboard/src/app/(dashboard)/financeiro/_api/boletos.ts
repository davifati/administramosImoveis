
import axios from "axios";
import { IBoletoAcumuladoAdministradora } from "../_abstract/boleto";
import { API_ENDPOINTS } from "@/endpoints";


export const getBoletoAcumuladoAdministradora = async () => {
    try {
        const url = API_ENDPOINTS.FINANCEIRO_BOLETOS_RANKING;
        const response = await axios.get(url);
        return response.data as IBoletoAcumuladoAdministradora[];
    } catch (error) {
        console.error('Erro ao buscar ranking de boletos:', error);
        throw new Error('Erro ao buscar ranking de boletos.');
    }
};


import axios from "axios";
import { IImovel } from "../_abstract/imoveis";
import { API_ENDPOINTS } from "@/endpoints";

export const getImoveis = async () => {
    try {
        const url = API_ENDPOINTS.IMOVEIS_ATIVOS_IMOBILIARIOS_INFO;
        const response = await axios.get(url);
        return response.data as IImovel;
    } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        throw new Error('Erro ao buscar imóveis');
    }
};


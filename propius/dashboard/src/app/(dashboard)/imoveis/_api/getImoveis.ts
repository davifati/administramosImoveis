
import axios from "axios";
import { IImovel } from "../_abstract/imoveis";


export const getImoveis = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_ATIVOS_IMOBILIARIOS}`;
        const response = await axios.get(url);
        return response.data as IImovel;
    } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        throw new Error('Erro ao buscar imóveis');
    }
};


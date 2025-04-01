import axios from "axios";
import { IKPIMesAnterior } from "../_abstract/KPIMesAnterior";


export const getKPIMensal = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_KPI_MENSAL}`;
        const response = await axios.get(url);
        return response.data as IKPIMesAnterior[];
    } catch (error) {
        console.error('Erro ao buscar ranking de boletos:', error);
        throw new Error('Erro ao buscar ranking de boletos.');
    }
};
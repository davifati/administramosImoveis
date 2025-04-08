
import axios from "axios";
import { IBoletoAcumuladoAdministradora } from "../_abstract/boleto";



export const getBoletoAcumuladoAdministradora = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_RANKING_BOLETOS}`;
        const response = await axios.get(url);
        return response.data as IBoletoAcumuladoAdministradora[];
    } catch (error) {
        console.error('Erro ao buscar ranking de boletos:', error);
        throw new Error('Erro ao buscar ranking de boletos.');
    }
};

import axios from "axios";


export const getHistoricoVolumeFinanceiro = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_ROTA_HISTORICO_VOLUME}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar getHistoricoVolumeFinanceiro:', error);
        throw new Error('Erro ao buscar getHistoricoVolumeFinanceiro.');
    }
};
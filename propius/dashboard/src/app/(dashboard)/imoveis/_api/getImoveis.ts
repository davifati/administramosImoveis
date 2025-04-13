
import axios from "axios";
import { ImovelTableRow } from "../_abstract/imoveis";
import { API_ENDPOINTS } from "@/endpoints";

export const getImoveis = async () => {
    try {
        const url = API_ENDPOINTS.IMOVEIS_ATIVOS_IMOBILIARIOS_INFO;
        const response = await axios.get(url);

        const imoveis: ImovelTableRow[] = response.data.map((im: any) => {
            return {
                administradora: im.administradora_nome.toUpperCase() || '',
                site: im.administradora_site.toLowerCase() || '',
                telefone: im.administradora_telefone || '',
                condominio: im.condominio_nome.toUpperCase() || '',
                endereco: im.condominio_endereco.toUpperCase() || '',
                proprietario: im.proprietario_nome.toUpperCase() || '',
                data_extracao: null,
                data_vencimento: null,
                status: null,
                origem_extracao: null,
                valor_boleto: null
            }
        })

        return imoveis;

    } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        throw new Error('Erro ao buscar imóveis');
    }
};

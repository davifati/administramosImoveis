import { getDataImobiliaria } from "../services/db.js";
import { recordStatus } from "../utils/generals.js";
import { scraperPROTEL } from "./condominio.protel.com.br.js";


let records = []

export async function runScraperPROTEL(db) {
    const RPA_NAME = "PROTEL"

    const data = await getDataImobiliaria(db, 'PROTEL');

    const applyFilter = dados => {
        return dados.filter(item =>
            item.SENHA &&
            item.LOGIN &&
            item['SITE ADMINISTRADORA']
        );
    };

    const filteredData = applyFilter(data)

    records.push(recordStatus(RPA_NAME, `Dados encontrados => ${JSON.stringify(data, null, 2)}`))
    records.push(recordStatus(RPA_NAME, `Número de registros encontrados => ${data.length}`))
    records.push(recordStatus(RPA_NAME, `Logins distintos => ${JSON.stringify(filteredData)}`))
    records.push(recordStatus(RPA_NAME, `Número de logins distintos => ${filteredData.length}`))

    await scraperPROTEL(filteredData)

}

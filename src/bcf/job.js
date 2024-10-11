import { fmtTimestamp, saveFile, formatDate, recordStatus } from "../utils/generals.js";
import { getDataImobiliaria } from "../services/db.js";
import { filterValidDataImobiliarias } from "../utils/filter.js";
import { scraperBCF } from "./app.bcfadm.com.br.js";
import { salvarBoleto } from "../services/db.js";

let records = []

// ALERT: NAO FAZ LOGIN VIA EMAIL
export async function runScraperBCFEmailLogin(db) {
    const RPA_NAME = "RunBCF"
    const dataBCF = await getDataImobiliaria(db, 'BCF');
    const filtrarPorEmail = dados => {
        return dados.filter(item =>
            item.SENHA === null &&
            item["E-MAIL DA ADMINISTRADORA"]
        );
    };
    const validDataBcf = filtrarPorEmail(dataBCF);
    console.log("filtrarPorEmail : validDataBcf => ", validDataBcf)
}

export async function runScraperBCF(db) {
    const RPA_NAME = "RunBCF"

    const dataBCF = await getDataImobiliaria(db, 'BCF');
    const validDataBcf = filterValidDataImobiliarias(dataBCF)

    records.push(recordStatus(RPA_NAME, `Dados encontrados => ${JSON.stringify(dataBCF, null, 2)}`))
    records.push(recordStatus(RPA_NAME, `Filtro de parametros de login distintos => ${JSON.stringify(validDataBcf, null, 2)}`))
    records.push(recordStatus(RPA_NAME, `Número de registros encontrados => ${dataBCF.length}`))
    records.push(recordStatus(RPA_NAME, `Número de logins distintos => ${validDataBcf.length}`))
    records.push(recordStatus(RPA_NAME, `Logins distintos => ${JSON.stringify(validDataBcf)}`))

    const dadosBoletos = await scraperBCF(validDataBcf);

    let status;
    try {
        if (dadosBoletos && dadosBoletos.length > 0) {
            const boletoData = await processBoletoData(RPA_NAME, dadosBoletos, validDataBcf);
            status = "Boletos salvos com sucesso.";

            const endImovel = dataBCF?.ENDERECO || "";


            await salvarBoleto(
                boletoData?.linhaDigitavelBoleto,
                boletoData?.vlrBoleto,
                boletoData?.vencimentoBoleto,
                boletoData?.administradora,
                boletoData?.link_pdf_boleto,
                endImovel,
                boletoData?.pasta,
            )

        }
    } catch (error) {
        records.push(recordStatus(RPA_NAME, status))
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
    } finally {
        records.push(recordStatus(RPA_NAME, status));
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`);
    }
}

async function processBoletoData(RPA_NAME, dadosBoletos, validDataBcf) {
    const boletosPromises = dadosBoletos.map(async (dadosBoleto, i) => {
        const { valor, vencimento, linhaDigitavel } = dadosBoleto;

        const administradora = validDataBcf[i]?.ADMINISTRADORA || "";
        const pasta = validDataBcf[i]?.PASTA || "";
        const linhaDigitavelBoleto = linhaDigitavel[i] || '';
        const vlrBoleto = parseFloat((valor[i]?.replace("R$", "").trim() || '').replace(/\./g, '').replace(',', '.'));
        const vencimentoBoleto = formatDate(vencimento[i] || '');

        const savedData = {
            linhaDigitavelBoleto,
            vlrBoleto,
            vencimentoBoleto,
            administradora,
            link_pdf_boleto: '',
            endereco_imovel: '',
            pasta,
        };

        if (!linhaDigitavelBoleto || isNaN(vlrBoleto) || !vencimentoBoleto) {
            console.error("Um ou mais parâmetros estão indefinidos!");
            return null; // Retorna null para indicar que não foi salvo
        }

        // Salva os dados do boleto e trata o possível erro
        try {
            await saveFile(savedData, "boletos", `${RPA_NAME}_${fmtTimestamp()}.json`);
            return savedData; // Retorna os dados salvos
        } catch (error) {
            console.error("Erro ao salvar o boleto:", error);
            return null; // Retorna null em caso de erro
        }
    });

    const results = await Promise.all(boletosPromises);
    return results.filter(data => data !== null); // Retorna apenas os dados que foram salvos
}

import puppeteer from "puppeteer";
import { configDotenv } from "dotenv";
import { recordStatus, saveFile, fmtTimestamp } from "../utils/utils.js";
import { ENVVAR } from "./constant.js";

configDotenv()

const RPA_NAME = "abrj.superlogica.net"
const url = "https://abrj.superlogica.net/clients/areadocondomino"

const records = []

records.push(recordStatus(RPA_NAME, "Iniciando RPA"))
records.push(recordStatus(RPA_NAME, "Carregando Variaveis de ambiente"))

records.push(recordStatus(RPA_NAME, "Variaveis de ambiente: " + JSON.stringify(ENVVAR)))

const getBoletos = async () => {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    records.push(recordStatus(RPA_NAME, "Abrindo Pagina:  " + url), "ok")

    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });

    records.push(recordStatus(RPA_NAME, "Localizando Elemento: #email", "ok"))
    await page.locator("#email").fill(ENVVAR.RPA_SUPERLOGICA_LOGIN);
    records.push(recordStatus(RPA_NAME, `Preenchendo Elemento: #email => ${ENVVAR.RPA_SUPERLOGICA_LOGIN}`, "ok"))


    await page.locator("#salvar").click();

    records.push(recordStatus(RPA_NAME, "Localizando Elemento: #senha", "ok"))
    await page.locator('#senha').waitHandle();

    records.push(recordStatus(RPA_NAME, "Tentando preencher Elemento: #senha => " + ENVVAR.RPA_SUPERLOGICA_PASSWORD, "ok"))
    await page.locator("#senha").fill(ENVVAR.RPA_SUPERLOGICA_PASSWORD);

    records.push(recordStatus(RPA_NAME, "Localizando Elemento: #salvar", "ok"))
    await page.locator("#salvar").click();

    records.push(recordStatus(RPA_NAME, "Localizando Elemento: .em-abertas", "ok"))
    await page.locator('.em-abertas').waitHandle();

    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        const linkBoletos = await page.$$(".em-abertas>a");
        records.push(recordStatus(RPA_NAME, "linkBoletos (nao resolvidos)! => " + linkBoletos, "ok"))

        records.push(recordStatus(RPA_NAME, "Links Boletos: " + formattedLinks, "ok"));

    } catch (error) {
        records.push(recordStatus(RPA_NAME, "Erro ao pegar links boletos: " + JSON.stringify(error), "ok"))

    }
    const bills = []
    for (let i = 0; i < linkBoletos.length; i++) {

        const link = linkBoletos[i];
        records.push(recordStatus(RPA_NAME, "Link Boleto: " + link, "ok"))

        records.push(recordStatus(RPA_NAME, "Tentando Salvar Boleto: " + link, "ok"))
        try {
            await link.click();
            await page.locator('#salvar').click();

            const [newPage] = await Promise.all([
                new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
            ]);

            await newPage.locator('p.enderecoCliente').waitHandle();
            await newPage.locator('textarea.text').waitHandle();

            // await new Promise(resolve => setTimeout(resolve, 3000));
            await new Promise(resolve => setTimeout(resolve, 3000));

            const endereco_imovel = (await getElementTextContent("p.enderecoCliente", newPage)).replace("\n", ", ");
            const data_vencimento = convertDateToMySQLFormat(await getElementTextContent("p.vencCliente", newPage));
            const vlr_boleto = extractNumberAsFloat(await getElementTextContent("p.valorFatura", newPage));
            const linha_digitavel = await getElementTextContent("textarea.text", newPage);
            // await newPage.locator('.pagarBoleto').click();

            bills.push({ endereco_imovel, data_vencimento, vlr_boleto, linha_digitavel })

            records.push(recordStatus(RPA_NAME, "Dados do Boleto: " + { endereco_imovel, data_vencimento, vlr_boleto, linha_digitavel }, "ok"))

            const pdfUrl = newPage.url().replace("-FaturaHtml-flSegundaVia", "-flSegundaVia-original");

            records.push(recordStatus(RPA_NAME, "Url do Boleto: " + pdfUrl, "ok"))

            newPage.close()
            const response = await fetch(pdfUrl);

            if (!response.ok) {
                records.push(recordStatus(RPA_NAME, "Falha ao salvar PDF: " + pdfUrl, "Nok"))
                await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            records.push(recordStatus(RPA_NAME, "Lendo PDF: " + pdfUrl, "ok"))

            records.push(recordStatus(RPA_NAME, "Enviando PDF para o S3: " + pdfUrl, "ok"))
            await saveFile(buffer, "boleto.pdf")

        } catch (e) {
            if (e.message == 'Node is either not clickable or not an Element')
                records.push(recordStatus(RPA_NAME, "Elemento aparenemente nao clickavel.. tentando novamente.. : " + pdfUrl, "Nok"))
            continue;
        }
    }
    try {
        await browser.close();
        return bills;
    } catch (error) {
        records.push(recordStatus(RPA_NAME, "Pagina Fechada com Sucesso: " + pdfUrl, "ok"))
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
        return bills;
    }
};


async function getElementTextContent(searchString, page) {
    const element = await page.$(searchString);
    const data = await page.evaluate(name => name.textContent, element);
    return data;
}



try {
    const boletos = await getBoletos()
    console.log("Boletos => ", boletos)
} catch (error) {
    await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
    process.exit(1)
}

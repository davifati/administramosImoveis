import puppeteer from "puppeteer";
import { recordStatus } from "../utils/generals.js";
import { saveFile } from "../utils/generals.js";
import { fmtTimestamp } from "../utils/generals.js";


const RPA_NAME = 'BCF'
const records = []
records.push(recordStatus(RPA_NAME, "Iniciando RPA"))

function parseBoletoInfo(boleto) {
    const vencimento = boleto.match(/Vencimento:\s*(\d{2}\/\d{2}\/\d{4})/)[1];
    const valor = boleto.match(/Valor:\s*(R\$ [\d.,]+)/)[1];
    const numero = boleto.match(/Número:\s*(\d+)/)[1];
    let linhaDigitavel = boleto.match(/Linha Digitável:\s*([\s\S]+?)\n/)[1].trim(); // Captura tudo até a nova linha e remove espaços em branco

    const linhaDigitavelSemPontos = linhaDigitavel.replace(/\./g, '').replace(/\s/g, '');
    linhaDigitavel = linhaDigitavelSemPontos;

    return {
        vencimento,
        valor,
        numero,
        linhaDigitavel
    };
}

function processarBoletos(dadosBoletos) {
    dadosBoletos = dadosBoletos.map(boleto => parseBoletoInfo(boleto));

    if (dadosBoletos.length > 0) {
        records.push(recordStatus(RPA_NAME, `Boletos => ${JSON.stringify(dadosBoletos)}`), "ok");
    } else {
        records.push(recordStatus(RPA_NAME, `Error ao mapear Boletos => ${JSON.stringify(dadosBoletos)}`), "ok");
    }

    return {
        valor: dadosBoletos.map(boleto => boleto.valor),
        numero: dadosBoletos.map(boleto => boleto.numero),
        linhaDigitavel: dadosBoletos.map(boleto => boleto.linhaDigitavel),
        vencimento: dadosBoletos.map(boleto => boleto.vencimento)
    };
}


export async function scraperBCF(dataImobiliarias) {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--disable-extensions',
            '--window-size=960,540',
            '--ignore-certificate-errors',
            '--disable-dev-shm-usage'
        ],
        timeout: 30000,
    });

    try {
        let count = 0;
        let dataBoletos = []
        for (const imobiliaria of dataImobiliarias) {
            const siteAdministradora = imobiliaria["SITE ADMINISTRADORA"];
            const login = imobiliaria["LOGIN"]
            const senha = imobiliaria["SENHA"]

            records.push(recordStatus(RPA_NAME, `${count} - Abrindo Página => ${siteAdministradora}`), "ok")

            const page = await browser.newPage();
            try {
                await page.goto(siteAdministradora, {
                    waitUntil: "networkidle0",
                });
                // login
                records.push(recordStatus(RPA_NAME, `${count} - Tentando localizar ucLoginSistema_tbNomeEntrar`), "ok")
                await page.locator('#ucLoginSistema_tbNomeEntrar').waitHandle();

                records.push(recordStatus(RPA_NAME, `${count} - Tentando localizar ucLoginSistema_tbNomeEntrar => ${login} `))

                await page.locator("#ucLoginSistema_tbNomeEntrar").fill(login);
                await new Promise(resolve => setTimeout(resolve, 1000));

                records.push(recordStatus(RPA_NAME, `"Tentando preencher ucLoginSistema_tbSenhaEntrar =>  ${senha})`), "ok")

                await page.locator('#ucLoginSistema_tbSenhaEntrar').fill(senha);
                await new Promise(resolve => setTimeout(resolve, 1000));

                records.push(recordStatus(RPA_NAME, "Tentando localizar ucLoginSistema_btEntrar"), "ok")

                await page.locator('#ucLoginSistema_btEntrar').click();
                await page.waitForNavigation({ waitUntil: 'networkidle0' });

                records.push(recordStatus(RPA_NAME, "Tentando lidar com ucHeadBanner_lkBoleto"))

                // await page.locator('#ucHeadBanner_lkBoleto').waitHandle();
                await page.waitForSelector('#ucHeadBanner_lkBoleto', { timeout: 60000 });

                const [response] = await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    page.locator('#ucHeadBanner_lkBoleto').click(),
                ]);
                if (!response.ok()) {
                    records.push(recordStatus(RPA_NAME, "Tentando lidar com ucHeadBanner_lkBoleto"))
                    throw new Error(`Erro ao carregar a página: ${response.status()}`);
                }
                //await page.locator('#ContentBody_ucBoletoLista_upListaBoleto').waitHandle();
                await page.waitForSelector('#ContentBody_ucBoletoLista_upListaBoleto', { timeout: 60000 });

                // Pegar os boletos
                const listaBoleto = await page.$$("#ContentBody_ucBoletoLista_upListaBoleto > div");

                let dadosBoletos = await Promise.all(listaBoleto.map(async (boleto) => {
                    const info = await boleto.evaluate(el => el.innerText);
                    return info;
                }));

                records.push(recordStatus(RPA_NAME, `"Boletos encontrados =>  ${JSON.stringify(dadosBoletos)})`), "ok")

                if (dadosBoletos) {
                    dataBoletos.push(processarBoletos(dadosBoletos))
                }
            } catch (error) {
                console.error(`Erro ao carregar a página ${siteAdministradora}:`, error);
                continue;
            } finally {
                await page.close();
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            count++;
        }
        return dataBoletos;
    } catch (error) {
        console.error('Erro durante a execução do Puppeteer:', error);
        //await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
    } finally {
        console.log("Processo concluído. Verifique os logs!!");
        await browser.close();
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`)
    }
}



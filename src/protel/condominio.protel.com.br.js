import puppeteer from "puppeteer";
import { saveFile } from "../utils/generals.js";
import { fmtTimestamp } from "../utils/generals.js";
import { recordStatus } from "../utils/generals.js";
import fs from 'fs';
import path from 'path'



const RPA_NAME = 'PROTEL';
let records = [];

export async function scraperPROTEL(dataImobiliarias) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--disable-extensions',
            //'--window-size=960,540',
            '--ignore-certificate-errors',
            '--disable-dev-shm-usage'
        ],
        timeout: 30000,
    });

    try {

        let count = 0;
        for (const dataImobiliaria of dataImobiliarias) {
            const siteAdministradora = dataImobiliaria['SITE ADMINISTRADORA'];
            const login = dataImobiliaria.LOGIN;
            const senha = dataImobiliaria.SENHA;

            const page = await browser.newPage();

            records.push(recordStatus(RPA_NAME, `${count} - Abrindo Página => ${siteAdministradora}`), "ok");

            try {
                await page.goto(siteAdministradora, {
                    waitUntil: "networkidle0"
                });

                // Wait for the login field to appear
                //await page.waitForSelector('#usuario_senha', { timeout: 60000 });
                //records.push(recordStatus(RPA_NAME, `${count} - Tentando localizar => #usuario_senha`), "ok");

                records.push(recordStatus(RPA_NAME, `${count} - Preenchendo #usuario_login => ${login}`), "ok");
                await page.locator("#usuario_login").fill(login);

                records.push(recordStatus(RPA_NAME, `${count} - Preenchendo #usuario_senha => ${senha}`), "ok");
                await page.locator('#usuario_senha').fill(senha);

                records.push(recordStatus(RPA_NAME, `${count} - Tentando localizar => #botao_login`), "ok");
                await page.locator('#botao_login').click();

                await page.waitForNavigation({ waitUntil: "networkidle0" });

                records.push(recordStatus(RPA_NAME, `${count} - Navegando para 2ª via de boleto`), "ok");

                await page.goto("https://condominio.protel.com.br/unidades/segunda_via_boleto", {
                    waitUntil: "networkidle0"
                });

                console.log("k777 ")

                const pdfUrl = await page.evaluate(() => {
                    const linkElement = document.querySelector('#boleto_7730582_pdf');
                    return linkElement ? linkElement.href : null;
                });

                console.log("pdfUrl ", pdfUrl)

                if (pdfUrl) {
                    const pdfPage = await browser.newPage(); // Crie uma nova página para o download
                    await pdfPage.goto(pdfUrl, { waitUntil: 'networkidle0' });

                    // 3. Configure para baixar o arquivo
                    const downloadPath = '/Users/davidlima/Documents/WSPACE/gridweb/rpa-imobiliaria/boletos/'; // Defina o caminho para salvar o arquivo


                    // Crie um diretório se ele não existir
                    if (!fs.existsSync(downloadPath)) {
                        fs.mkdirSync(downloadPath, { recursive: true });
                    }

                    // Salvar o PDF na pasta desejada
                    const filePath = path.join(downloadPath, 'boleto.pdf'); // Nome do arquivo
                    const buffer = await pdfPage.content(); // Obtém o conteúdo da página (PDF)
                    fs.writeFileSync(filePath, buffer); // Salva o arquivo

                    console.log(`PDF salvo em: ${filePath}`);
                    await pdfPage.close(); // Fecha a página do PDF
                } else {
                    console.error('URL do PDF não encontrada.');
                }





                const linhaDigitavel = await page.evaluate(() => {
                    const td = document.querySelector('td[colspan="5"]');
                    return td ? td.innerText : null;
                });

                if (linhaDigitavel) {
                    records.push(recordStatus(RPA_NAME, `Linha Digitável: ${linhaDigitavel}`), "ok");
                    console.log(`Linha Digitável: ${linhaDigitavel}`)
                } else {
                    records.push(recordStatus(RPA_NAME, `Linha Digitável não encontrada.`), "error");
                    console.log(`Linha Digitável não encontrada!`)
                }






            } catch (error) {
                console.error(`Erro ao carregar a página ${siteAdministradora}:`, error);
                records.push(recordStatus(RPA_NAME, `Error ao processar ${siteAdministradora}: ${error.message}`), "error");
                //continue;
            } finally {
                await page.close();
                await new Promise(resolve => setTimeout(resolve, 1000));

            }
            count++;
        }

    } catch (error) {
        console.error('Erro durante a execução do Puppeteer:', error);
        records.push(recordStatus(RPA_NAME, `Error: ${error.message}`), "error");
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`);
    } finally {
        await saveFile(records, "reports", `${RPA_NAME}_${fmtTimestamp()}.json`);
        // await page.close(); // Close the page here, after all processing
        await browser.close();
    }
}

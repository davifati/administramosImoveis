import puppeteer from "puppeteer";
import { configDotenv } from "dotenv";

configDotenv()

const getQuotes = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    await page.goto("https://areaexclusiva.apsa.com.br/digital/login", {
        waitUntil: "domcontentloaded"
    });
    await page.locator('text/Esqueceu sua senha?').waitHandle();
    await page.locator("#login").fill(process.env.APSA_LOGIN);
    await page.locator('div.FormGroup_Input > input[type="password"][passwordtoggle]').fill(process.env.APSA_PASSWORD);
    await page.locator(`::-p-xpath(//button[.//text()[contains(., ' Entrar ')]])`).click()
    
    await page.locator('text/2ª via de boletos').waitHandle();
    await page.goto("https://areaexclusiva.apsa.com.br/digital/cotas/visualizacaoIndividual", {
        waitUntil: "domcontentloaded",
    });

    const pages = [];
    browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
        const newPage = await target.page();
        await newPage.waitForNavigation()
        pages.push(newPage);
    }
    });

    await page.locator('.ListActions_Item_DetalhamentoCota').waitHandle();
    const results = await page.evaluate((searchText) => {
        const itemList = document.querySelectorAll('.Item_DetalhamentoCota_Item');
        const result = [];

        itemList.forEach(element => {
          if (element.innerText.includes('Em aberto')) {
            result.push(element);
          }
        });
        result.forEach(element => {
            const targetElement = element.querySelector('.fa-copy');
            if (targetElement) {
                targetElement.click();
            }
        });
        result.forEach(element => {
            const targetElement = element.querySelector('.fa-barcode');
            if (targetElement) {
                targetElement.click();
            }
        });
        return result
    });
    // await  new Promise(resolve => setTimeout(resolve, 5000));
    
    // const newPages = await Promise.all(pages);
    // for (const newPage of newPages) {
    //     console.log(`New page URL: ${newPage.url()}`);
    
    //     await newPage.close();
    // }

    const clipboardContent = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
    });
    // Vencimento:
    // Devido:
    // return {
    //     linha_digitavel: , // X
    //     vlr_boleto: , // V
    //     data_vencimento: , // V
    //     nome_administradora: , // V
    //     link_pdf_boleto: , // V
    //     endereco_imovel:  // X
    // }
    await browser.close();
};
getQuotes();
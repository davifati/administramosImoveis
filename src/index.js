import path from 'path';
import { runScraperBCF, runScraperBCFEmailLogin } from './bcf/job.js';
import { runScraperPROTEL } from './protel/job.js';


const __dirname = path.dirname(new URL(import.meta.url).pathname);
const DB_LITE_INFO_IMOBILIARIA = path.join(__dirname, 'INFO_ADMINISTRATIVA_IMOBILIARIA.db');

//await runScraperBCF(DB_LITE_INFO_IMOBILIARIA);
//await runScraperBCFEmailLogin(DB_LITE_INFO_IMOBILIARIA);

await runScraperPROTEL(DB_LITE_INFO_IMOBILIARIA)
process.exit(1)


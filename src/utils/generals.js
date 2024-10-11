import fs from 'fs';
import path from 'path'


export function convertDateToMySQLFormat(dateStr) {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

export function extractNumberAsFloat(text) {
    const match = text.match(/R\$\s*([\d\.,]+)/);
    if (match) {
        const numberString = match[1].replace(/\./g, '').replace(',', '.');
        return parseFloat(numberString);
    } else {
        return null;
    }
}

export async function saveFile(data, pasta, fileName) {
    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);

        const folderPath = path.join(__dirname, pasta);
        const filePath = path.join(folderPath, fileName);
        // Cria a pasta se não existir
        fs.mkdirSync(folderPath, { recursive: true });
        // Escreve o buffer no arquivo

        const buffer = Buffer.from(JSON.stringify(data, null, 2)); // Formatação legível

        fs.writeFileSync(filePath, buffer);
        console.log(`Arquivo salvo em: ${filePath}`);
    } catch (error) {
        console.error('Erro ao salvar o arquivo:', error);
    }
}
export function recordStatus(rpa, operation, status, result = null) {
    return { rpa, operation, status, result };
}

export function fmtTimestamp() {
    try {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, '');
        const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '');
        return `${formattedDate}_${formattedTime}`;
    } catch (error) {
        process.exit(1)
    }
}

export function formatDate(vencimento) {
    if (!vencimento) return '';
    const [day, month, year] = vencimento.split('/');
    return `${year}-${month}-${day}`;
}

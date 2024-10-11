import mysql from 'mysql2/promise';
import sqlite3 from 'sqlite3'

export async function salvarBoleto(
    linha_digitavel,
    vlr_boleto,
    data_vencimento,
    nome_administradora,
    link_pdf_boleto,
    endereco_imovel,
    id_condominio
) {

    // TODO: fix
    const data = [
        linha_digitavel !== undefined ? linha_digitavel : 0,
        vlr_boleto !== undefined ? vlr_boleto : 0,
        data_vencimento !== undefined ? data_vencimento : "",
        nome_administradora !== undefined ? nome_administradora : "",
        link_pdf_boleto !== undefined ? link_pdf_boleto : "",
        endereco_imovel !== undefined ? endereco_imovel : "",
        id_condominio !== undefined ? id_condominio : 0,
    ];

    const db = await mysql.createConnection({
        host: "24.144.96.26",
        user: "alugueseguro_admim",
        database: "alugueseguro_admimo",
        password: "xGriWP!Ut#Hd1v9K",
    });

    try {
        const query = `
            INSERT INTO scrapercondominios (
                linha_digitavel, 
                vlr_boleto, 
                data_vencimento, 
                nome_administradora, 
                link_pdf_boleto, 
                endereco_imovel, 
                num_pasta
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        console.log("Boleto a ser salvo no db => ", JSON.stringify(data));

        try {
            const [result] = await db.execute(query, data);
            console.log("Boleto inserido com sucesso!", result);
        } catch (error) {
            // Tratar erro de violação de chave única
            if (error.code === 'ER_DUP_ENTRY') {
                console.log("Violação de campo único. Ignorando o registro. Isso não é necessariamente um erro:\n", error);
            } else {
                console.error("Erro ao salvar boleto:", error);
                throw new Error(`Erro nao tratado ao salvar boleto: ${error.message}`);
            }
        }
    } catch (error) {
        console.error("Erro ao conectar ou executar a operação no banco de dados:", error);
        throw error;
    } finally {
        await db.end();
    }
}


export async function getDataImobiliaria(db_name, administradora) {
    const query = `
        SELECT 
            PASTA, 
            ADMINISTRADORA, 
            "SITE ADMINISTRADORA",
            LOGIN, 
            SENHA,
            "E-MAIL DA ADMINISTRADORA",
            "ENDEREÇO" as ENDERECO
        FROM 
            INFO_ADMINISTRATIVA_IMOBILIARIA
        WHERE 
            ADMINISTRADORA = '${administradora}'
    `;
    const db = new sqlite3.Database(db_name);

    return new Promise((resolve, reject) => {
        try {
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Erro na consulta:', err.message);
                    reject(err);
                } else {
                    if (!rows || rows.length === 0) {
                        console.log("getDataImobiliaria => Nenhum dado encontrado.");
                        throw new Error("getDataImobiliaria => Nenhum dado encontrado.");
                    }
                    resolve(rows);
                }
            });
        } catch (error) {
            console.error('Erro inesperado:', error);
            reject(error);
        } finally {
            db.close();
        }
    });
}

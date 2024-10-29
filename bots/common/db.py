import mysql.connector
from mysql.connector import Error

class MySqlConnector:
    DB_HOST = "24.144.96.26"
    DB_NAME = "alugueseguro_admimo"
    DB_USER = "alugueseguro_admim"
    DB_PASSWORD = "xGriWP!Ut#Hd1v9K"

    def __init__(self):
        self.connection = None
        try:
            self.connection = mysql.connector.connect(
                host=MySqlConnector.DB_HOST,
                user=MySqlConnector.DB_USER,
                password=MySqlConnector.DB_PASSWORD,
                database=MySqlConnector.DB_NAME,
            )
            if self.connection.is_connected():
                print("Conectado ao banco de dados")
        except Error as e:
            print(f"Erro ao conectar ao MySQL: {e}")

    def salvar_boleto(self, boletos: dict):
        query = """
            INSERT INTO scrapercondominios 
            (
                linha_digitavel, 
                vlr_boleto, 
                data_vencimento, 
                nome_administradora, 
                link_pdf_boleto, 
                endereco_imovel, 
                num_pasta
            ) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        data = [
            boletos["linha_digitavel"],
            boletos["vlr_boleto"],
            boletos["data_vencimento"],
            boletos["nome_administradora"],
            boletos["link_pdf_boleto"],
            boletos["endereco_imovel"],
            boletos["num_pasta"],
        ]

        try:
            cursor = self.connection.cursor()
            cursor.execute(query, data)
            self.connection.commit()
            print("Boleto adicionada com sucesso.")
        except Error as e:
            print(f"Erro ao inserir o boleto: {e}")
        finally:
            cursor.close()

    def close_connection(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Conexão encerrada")


# Exemplo de uso
if __name__ == "__main__":
    db = MySqlConnector()

    boleto = {
        "linha_digitavel": "12345678901234567890123456789012345678901234",
        "vlr_boleto": 100.0,
        "data_vencimento": "2024-10-15",
        "nome_administradora": "Administradora XYZ",
        "link_pdf_boleto": "http://example.com/boleto.pdf",
        "endereco_imovel": "Rua Exemplo, 123",
        "num_pasta": 1,
    }

    db.salvar_boleto(boleto)
    db.close_connection()

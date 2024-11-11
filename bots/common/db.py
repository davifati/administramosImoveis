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

    def obter_dados(self, administradora):
        cursor = self.connection.cursor(dictionary=True, buffered=True) 
        cursor.execute("""
                SELECT id, nome, site, email, telefones
                FROM administradoracondominios
                WHERE nome = %s
            """, (administradora,))
            
        admin_info = cursor.fetchone()
        cursor.close()

        if admin_info is None:
            return {"erro": "Administradora não encontrada"}
        
        admin_id = admin_info['id']

        cursor = self.connection.cursor(dictionary=True, buffered=True)
        cursor.execute("""
            SELECT id, nome, endereco, complemento_endereco, numero, cep, email
            FROM administracaocondominios
            WHERE administradoracondominio_id = %s
        """, (admin_id,))
        administracao_condominios = cursor.fetchall()        
        cursor.close()

        unidades = []

        for adm in administracao_condominios:
            administracao_id = adm['id']       

            cursor = self.connection.cursor(dictionary=True, buffered=True)
            cursor.execute("""
                SELECT id, bloco, num_unidade, num_pasta, documento_proprietario, 
                        nome_proprietario, login, senha, administracaocondominio_id
                FROM unidadecondominios
                WHERE administracaocondominio_id = %s
            """, (administracao_id,))
            unidades_condominio = cursor.fetchall()
            unidades.extend(unidades_condominio)
            cursor.close()

        resultado = {
            "administradora": {
                "id": admin_info['id'],
                "nome": admin_info['nome'],
                "site": admin_info['site'],
                "email": admin_info['email'],
                "telefones": admin_info['telefones'],
            },
            "administracao_condominios": administracao_condominios,
            "unidades": unidades,
        }        

        return resultado

    def organizar_dados_unidade(self, dados):
        if "erro" in dados:
            return dados  # Retorna o erro diretamente

        nome_administradora = dados['administradora']['nome']

        # Cria um dicionário para mapear cada administração de condomínio ao seu endereço
        endereco_map = {
            adm['id']: f"{adm['endereco']}, {adm['complemento_endereco']}, {adm['numero']}, CEP: {adm['cep']}"
            for adm in dados['administracao_condominios']
        }

        # Monta a lista de resultados com as informações solicitadas, associando cada unidade ao seu endereço correto
        resultado = [
            {
                "num_pasta": unidade['num_pasta'],
                "login": unidade['login'],
                "senha": unidade['senha'],
                "administradora_nome": nome_administradora,
                "endereco_completo": endereco_map.get(unidade['administracaocondominio_id'], "Endereço não disponível")
            }
            for unidade in dados['unidades']
        ]

        return resultado
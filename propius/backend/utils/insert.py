from datetime import datetime
import sqlite3
import json

# Mapeamento entre colunas antigas e novas
MAPEAMENTO_COLUNAS = {
    # "administradoracondominios": {
    #    "id": "id_migracao",
    #    "nome": "nome",
    #    "email": "email",
    #    "site": "site",
    #    "telefones": "telefone",
    #    "created": "criado_em",
    #    "updated": "atualizado_em",
    # },
    # "administracaocondominios": {
    #    "id": "id_migracao",
    #    "administradoracondominio_id": "administradoracondominio_id",
    #    "nome": "nome",
    #    "endereco": "endereco",
    #    "numero": "numero",
    #    "cep": "cep",
    #    "email": "email",
    #    "telefones": "telefone",
    #    "created": "criado_em",
    #    "updated": "atualizado_em",
    # },
    # "unidadecondominios": {
    #    "id": "id_migracao",
    #    "administracaocondominio_id": "administracaocondominio_id",
    #    "bloco": "bloco",
    #    "num_unidade": "unidade",
    #    "cep": "cep",
    #    "num_pasta": "pasta",
    #   "documento_proprietario": "proprietario_documento",
    #   "nome_proprietario": "proprietario_nome",
    #    "login": "login",
    #    "senha": "senha",
    #    "created": "criado_em",
    #    "updated": "atualizado_em",
    # },
    "scrapercondominios": {
        "id": "id_migracao",
        "num_pasta": "pasta",
        "data_vencimento": "data_vencimento",
        "vlr_boleto": "valor",
        "linha_digitavel": "linha_digitavel",
        "nome_administradora": "origem",
        "link_pdf_boleto": "link_pdf",
        "endereco_imovel": "endereco",
        "created": "criado_em",
    }
}


def inserir_json_em_sqlite(caminho_json, nome_tabela, db_path="meubanco.db"):
    """
    Lê um arquivo JSON contendo uma lista de dicionários e insere os dados
    em uma tabela existente no banco SQLite, mapeando as colunas antigas para novas.

    - caminho_json: Caminho para o arquivo JSON.
    - nome_tabela: Nome da tabela existente no banco.
    - db_path: Caminho para o banco SQLite (.db).
    """
    conn = None
    try:
        with open(caminho_json, "r", encoding="utf-8") as f:
            dados = json.load(f)

        if not isinstance(dados, list):
            print("O JSON precisa conter uma lista de dicionários.")
            return

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("PRAGMA foreign_keys = OFF;")

        for item in dados:
            try:
                model = item["model"]
                fields = item["fields"]

                # Remove o campo qtdeimoveis se existir
                if "qtdeimoveis" in fields:
                    del fields["qtdeimoveis"]

                # Mapeia as colunas antigas para novas
                campos_mapeados = {}
                for coluna_antiga, valor in fields.items():
                    if coluna_antiga in MAPEAMENTO_COLUNAS[model]:
                        coluna_nova = MAPEAMENTO_COLUNAS[model][coluna_antiga]
                        campos_mapeados[coluna_nova] = valor
                        print(f"Mapeando coluna: {coluna_antiga} -> {coluna_nova}")

                # Adiciona campos de timestamp
                agora = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                campos_mapeados["atualizado_em"] = agora
                campos_mapeados["criado_em"] = agora
                campos_mapeados["status"] = "vencido"

                colunas = ", ".join(campos_mapeados.keys())
                placeholders = ", ".join(["?" for _ in campos_mapeados])
                valores = tuple(campos_mapeados.values())

                query = (
                    f"INSERT INTO {nome_tabela} ({colunas}) VALUES ({placeholders});"
                )
                print(query)
                print("Values:", valores)
                print("-" * 100)
                cursor.execute(query, valores)

            except Exception as e:
                print(f"Erro ao processar item: {e}")
                continue

        conn.commit()
        print(f"{len(dados)} registros inseridos na tabela '{nome_tabela}'.")

    except FileNotFoundError:
        print(f"Arquivo não encontrado: {caminho_json}")
    except json.JSONDecodeError:
        print("Erro ao decodificar o arquivo JSON")
    except sqlite3.Error as e:
        print(f"Erro no banco de dados SQLite: {e}")
    except Exception as e:
        print(f"Erro inesperado: {e}")
    finally:
        if conn:
            conn.close()


try:
    inserir_json_em_sqlite(
        caminho_json="fixtures/scrapercondominios.json",
        nome_tabela="monitoramento_boleto",
        db_path="db.sqlite3",
    )
except Exception as e:
    print(f"Erro ao executar o script: {e}")

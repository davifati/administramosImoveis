import time
import boto3
import json
import os
import PyPDF2
import re
import glob
import fitz
import tempfile
from datetime import datetime

AWS_ACCESS_KEY_ID = "AKIA2OAJT7MOSWOXM6U2"
AWS_SECRET_ACCESS_KEY = "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"
REGION_NAME = "us-east-1"

def extract_linha_digitavel_pymupdf(pdf_path):
    try:

        pdf_document = fitz.open(pdf_path)
        for page_number in range(pdf_document.page_count):
            page = pdf_document.load_page(page_number)
            page_text = page.get_text("text")

            for line in page_text.splitlines():
                if len(line) >= 47 and line.replace(" ", "").isdigit():
                    print(f"Linha Digitável encontrada: {line.strip()}")
                    return line.strip()
    
    except Exception as e:
        print(f"Erro ao tentar extrair a linha digitável: {e}")
        return None

def admin_login_list(items):
    login_details = []

    for item in items:
        
        id_imobiliaria = item.get("idImobiliaria", {}).get("S", "")
        login_usuario = item.get("login_usuario", {}).get("S", "")
        login_senha = item.get("login_senha", {}).get("S", "")
        condominio = item.get("condominio", {}).get("S", "")
        proprietario = item.get("proprietario", {}).get("S", "")
        endereco_condominio = item.get("endereco_condominio", {}).get("S", "")

        login_details.append((id_imobiliaria, login_usuario, login_senha, condominio, proprietario, endereco_condominio))

    return login_details

def delete_all_files_in_directory(download_dir):
    files = glob.glob(os.path.join(download_dir, "*"))
    for file in files:
        try:
            os.remove(file)
            print(f"Arquivo removido: {file}")
        except Exception as e:
            print(f"Erro ao remover o arquivo {file}: {e}")

def get_downloaded_files(download_dir):
    # Retorna a lista de arquivos na pasta 'download_dir'
    return {f for f in os.listdir(download_dir) if os.path.isfile(os.path.join(download_dir, f))}

def wait_for_new_file(download_dir, previous_files, timeout=60):
    start_time = time.time()
    while time.time() - start_time < timeout:
        current_files = get_downloaded_files(download_dir)
        new_files = current_files - previous_files
        if new_files:
            return new_files.pop()
        time.sleep(1)
    raise TimeoutError("O download do arquivo excedeu o tempo limite.")

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
        return text

def extract_boleto_info(text):
    boleto_info = {}

    pagador_match = re.search(r'Pagador\n(.*) - CPF: ([\d\.\-]+)', text)
    if pagador_match:
        boleto_info['pagador'] = pagador_match.group(1).strip()
        boleto_info['cpf'] = pagador_match.group(2).strip()

    endereco_match = re.search(r'RUA (.*) - CEP: ([\d\-]+)', text)
    if endereco_match:
        boleto_info['endereco'] = f"RUA {endereco_match.group(1).strip()}"
        boleto_info['cep'] = endereco_match.group(2).strip()

    valor_match = re.search(r'R\$ ([\d\.,]+)', text)
    if valor_match:
        boleto_info['valor'] = f"R$ {valor_match.group(1).strip()}"

    vencimento_match = re.search(r'PAGÁVEL EM QU.*?(\d{2}/\d{2}/\d{4})', text)
    if vencimento_match:
        boleto_info['vencimento'] = vencimento_match.group(1).strip()    

    codigo_barras_match = re.search(r'(\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d \d{14})', text)
    if codigo_barras_match:
        boleto_info['codigo_barras'] = codigo_barras_match.group(1).strip()

    return boleto_info

def process_boleto(download_dir, previous_file, timeout=60):
    new_file = wait_for_new_file(download_dir, previous_file, timeout)
    new_file_path = os.path.join(download_dir, new_file)

    pdf_text = extract_text_from_pdf(new_file_path)
    boleto_info = extract_boleto_info(pdf_text)

    return boleto_info

def process_multiple_boletos(download_dir, n_boletos=60, timeout=60):
    previous_files = get_downloaded_files(download_dir)
    boletos_info = []

    for _ in range(n_boletos):
        try:
            boleto_info = process_boleto(download_dir, previous_files, timeout)
            boletos_info.append(boleto_info)
            previous_files = get_downloaded_files(download_dir)
        except TimeoutError:
            print("Erro: O tempo limite para download de um boleto foi excedido.")
            break

    return boletos_info

class DynamoDBQuery:
    def __init__(self, table_name="AdministramosImoveis"):
        self.table_name = table_name
        self.dynamodb = boto3.client(
            "dynamodb",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=REGION_NAME,
        )

    def getAdminLoginDetails(self, administradora="abrj"):
        query = f"""
        SELECT 
            "id", 
            "idImobiliaria", 
            "administradora", 
            "site_administradora", 
            "login_usuario", 
            "login_senha",
            "condominio",
            "cpf_proprietario",
            "endereco_condominio",
            "imobiliaria",
            "proprietario",
            "vencimento_aluguel"
        FROM 
            {self.table_name} 
        WHERE 
            "administradora" = '{administradora}'
        """

        try:
            response = self.dynamodb.execute_statement(Statement=query)
            return response.get("Items", [])
        except Exception as e:
            print(f"Erro ao executar a consulta: {e}")
            return None


def save_rpa_reports(reports: list[dict], administadora: str):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=REGION_NAME,
    )

    json_data = json.dumps(reports)

    temp_file = os.path.join(tempfile.gettempdir(), "temp_file.json")
    with open(temp_file, "w") as f:
        f.write(json_data)

    data_atual = datetime.now().strftime("%Y_%m_%d")

    bucket_name = "administramosimoveis-rpa-observability"
    object_name = f"{administadora}/{data_atual}"

    try:
        s3_client.upload_file(temp_file, bucket_name, object_name)
        print(f"Arquivo enviado para S3: s3://{bucket_name}/{object_name}")
    except Exception as e:
        print(f"Erro ao enviar o arquivo para S3: {e}")
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)


def save_boletos(pdf_file_path: str, administadora: str):
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=REGION_NAME,
    )

    temp_file = f"/tmp/{os.path.basename(pdf_file_path)}"
    os.replace(pdf_file_path, temp_file)

    data_atual = datetime.now().strftime("%Y_%m_%d")
    bucket_name = "administramosimoveis-rpa-observability"
    object_name = f"{administadora}/{data_atual}/{os.path.basename(temp_file)}"

    try:
        s3_client.upload_file(temp_file, bucket_name, object_name)
        print(f"Arquivo enviado para S3: s3://{bucket_name}/{object_name}")
    except Exception as e:
        print(f"Erro ao enviar o arquivo para S3: {e}")
    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)


#### SAVE PDF
# pdf_file_path = "info_rpa_aws.pdf"  #
# administadora = "exemplo_admin"
# save_boletos(pdf_file_path, administadora)


#### SAVE REPORTS
# Exemplo de uso:
# reports = [
#    {"id": 1, "data": "2024-10-11", "login": "sucesso"},
#    {"id": 2, "data": "2024-10-11", "login": "lendo pdf", "status": "falha"},
# ]
# administradora = "exemplo_administradora"
# save_rpa_reports(reports, administradora)

#### BANCO
# Exemplo de uso:
# dynamodb = DynamoDBQuery()
# items = dynamodb.getAdminLoginDetails("abrj")
# print(items[0])

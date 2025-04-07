import mysql.connector

host = "24.144.96.26"
login = "alugueseguro_admim"
password = "xGriWP!Ut#Hd1v9K"
database = "alugueseguro_admimo"

print("00 ")
try:
    conn = mysql.connector.connect(
        host=host,
        user=login,
        password=password,
        database=database,
    )

    cursor = conn.cursor()
except Exception as e:
    print(e)
    raise e

# Comando SELECT
query = "SELECT * FROM administradoracondominios LIMIT 10"
print("0")
cursor.execute(query)

print("A")
resultados = cursor.fetchall()

print("b")
for linha in resultados:
    print(linha)

# Encerra a conexão
cursor.close()
conn.close()

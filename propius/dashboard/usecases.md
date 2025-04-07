# Objetivo
Dashboard operacional e financeiro para gestão de débitos de contas: Boletos Condominiais

## Frentes

### Backend:
O backend tem como responsabilidade pegar automaticamente as informações de boletos dos sites das imobiliárias, utilizando um servidor com automação de sites com **Selenium** e **Python**.

### Frontend:
O frontend precisa notificar o usuário sobre inconsistências e boletos coletados com sucesso diariamente.

## Regra de Negócio

### Financeiro: Gestão de Débitos

- **Visão de Vencimentos**: O usuário poderá visualizar os vencimentos dos boletos e o valor total a ser pago.
  
- **Visão de Histórico**: O usuário poderá entender, por meio de uma série temporal, os valores pagos, uma previsão dos valores a serem pagos nos próximos meses (por meio de uma regressão linear) e a categorização por imóvel/imobiliária.

- **Filtros**:
  - Filtro temporal
  - Filtro por imobiliária
  - Top 10

- **Geração de Documento: Remessa Bancária**: O usuário deve ser capaz de gerar um único documento de Remessa Bancária com todos os passivos em aberto.

### Operacional

- O usuário precisa ser notificado e ter a visão de quais boletos foram processados com sucesso e quais não.
  
- O usuário precisa ser alertado em caso de alguma falha ou sucesso operacional.

- Cadastro de usuários e imobiliárias para ativar o servidor.



### 
Verificar Responsavidade das tabelas , e graficos expecialmente 

Vou usar supabase em postgres
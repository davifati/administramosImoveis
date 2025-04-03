from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class FinanceiroRankingBoletosAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:

        mockRankingBoletos = [
            {"administradora": "Beta Real Estate", "valor": 12000},
            {"administradora": "Gamma Properties", "valor": 8000},
            {"administradora": "Delta Habitação", "valor": 7000},
            {"administradora": "Imobiliária Alpha", "valor": 3000},
            {"administradora": "Beta Real Estate", "valor": 5000},
            {"administradora": "Gamma Properties", "valor": 4000},
        ]

        return Response(mockRankingBoletos, status=status.HTTP_200_OK)


class MesAnteriorKPIAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        # Dados fictícios para o ranking de KPIs
        mockRankingBillsKPI = [
            {
                "status": "Volume Financeiro",
                "percentage": "+0.7%",
                "color": "emerald",
                "description": "Total acumulado referente ao mês anterior.",
            },
            {
                "status": "Consistência",
                "percentage": "+0.7%",
                "color": "emerald",
                "description": "Consistência de captura de dados referente ao mês anterior.",
            },
            {
                "status": "Falhas",
                "percentage": "-0.7%",
                "color": "red",
                "description": "O total de falhas na extração de boletos referente ao mês anterior.",
            },
        ]

        # Retornar os dados como uma resposta JSON
        return Response(mockRankingBillsKPI, status=status.HTTP_200_OK)


class HistoricoValorBoletoAcumladoAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        # Dados fictícios de saldo mensal
        data = [
            {"date": "01/2023", "Balance": 1000},
            {"date": "02/2023", "Balance": 40320},
            {"date": "03/2023", "Balance": 50233},
            {"date": "04/2023", "Balance": 55123},
            {"date": "05/2023", "Balance": 56000},
            {"date": "06/2023", "Balance": 100000},
            {"date": "07/2023", "Balance": 85390},
            {"date": "08/2023", "Balance": 80100},
            {"date": "09/2023", "Balance": 75090},
            {"date": "10/2023", "Balance": 7080},
            {"date": "11/2023", "Balance": 68041},
            {"date": "12/2023", "Balance": 60143},
        ]

        # Retorna os dados como uma resposta JSON com status 200 OK
        return Response(data, status=status.HTTP_200_OK)

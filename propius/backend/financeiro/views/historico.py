from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from monitoramento.models.boleto import Boleto


class HistoricoValorBoletoAcumuladoAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:

        historico = (
            Boleto.objects.values_list(
                "criado_em__year", "criado_em__month"
            )  # Agrupar por ano/mês
            .annotate(Balance=Sum("valor"))  # Soma os valores do mês
            .order_by("criado_em__year", "criado_em__month")  # Ordena por data
        )

        data = [
            {"date": f"{str(ano).zfill(2)}/{str(mes).zfill(4)}", "Balance": saldo}
            for ano, mes, saldo in historico
        ]

        return Response(data, status=status.HTTP_200_OK)


class HistoricoValorBoletoAcumladoAPIView_old(APIView):

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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from imoveis.models.administradora import Administradora


class FinanceiroRankingBoletosAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        ranking_boletos = (
            Administradora.objects.annotate(
                valor_total=Sum("condominios__unidades__boletos__valor")
            )
            .filter(valor_total__gt=0)
            .order_by("-valor_total")
            .values("nome", "valor_total")
        )

        response_data = [
            {"administradora": item["nome"], "valor": item["valor_total"]}
            for item in ranking_boletos
        ]

        return Response(response_data, status=status.HTTP_200_OK)


class FinanceiroRankingBoletosAPIView_old(APIView):

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

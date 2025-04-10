from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from financeiro.services.ranking import RankingService
from imoveis.models.administradora import Administradora


class FinanceiroRankingBoletosAPIView(APIView):
    """
    Obtenha o ranking de administradoras por valor total de boletos.
    """

    def get(self, request, *args, **kwargs) -> Response:
        ranking = RankingService.get_ranking_administradoras()
        return Response(ranking, status=status.HTTP_200_OK)

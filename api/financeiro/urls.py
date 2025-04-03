from django.urls import path
from financeiro.views.historico import HistoricoValorBoletoAcumuladoAPIView
from financeiro.views import MesAnteriorKPIAPIView
from financeiro.views.ranking import FinanceiroRankingBoletosAPIView


urlpatterns = [
    path("ranking-boletos/", FinanceiroRankingBoletosAPIView.as_view()),
    path("kpi-mensal/", MesAnteriorKPIAPIView.as_view()),
    path("historico-volume/", HistoricoValorBoletoAcumuladoAPIView.as_view()),
]

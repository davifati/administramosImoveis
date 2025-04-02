from django.urls import path
from .views import (
    FinanceiroRankingBoletosAPIView,
    MesAnteriorKPIAPIView,
    HistoricoValorBoletoAcumladoAPIView,
)

urlpatterns = [
    path("ranking-boletos/", FinanceiroRankingBoletosAPIView.as_view()),
    path("kpi-mensal/", MesAnteriorKPIAPIView.as_view()),
    path("historico-volume/", HistoricoValorBoletoAcumladoAPIView.as_view()),
]

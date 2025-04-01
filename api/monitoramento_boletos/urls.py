from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BoletoViewSet,
    FalhasBotsImobiliariaView,
    CronogramaExecucaoBotsView,
    HistoricalExtractionCalendarView,
    FailsExtractionTrackerAPIView,
    MonthlyStatsView,
)

router = DefaultRouter()
router.register(r"boletos", BoletoViewSet, basename="boletos")

urlpatterns = [
    path("", include(router.urls)),  # Incluir as URLs geradas pelo router
    path("falhas/", FalhasBotsImobiliariaView.as_view()),
    path("cronograma/", CronogramaExecucaoBotsView.as_view(), name="bot-execucao"),
    path(
        "extracao/historico/",
        HistoricalExtractionCalendarView.as_view(),
        name="extracao-historico-calendar",
    ),
    path(
        "extracao/estatisica/",
        FailsExtractionTrackerAPIView.as_view(),
        name="FailsExtractionTrackerAPIView",
    ),
    path(
        "historico/captura-boletos/",
        MonthlyStatsView.as_view(),
        name="MonthlyStatsView",
    ),
]

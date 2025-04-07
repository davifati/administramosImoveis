from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from datetime import date, timedelta
from django.db.models import Sum, Count, Q
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from monitoramento.models.boleto import Boleto



class MesAnteriorKPIAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        hoje = now().date()
        primeiro_dia_mes_anterior = date(hoje.year, hoje.month - 1, 1)
        primeiro_dia_mes_retrasado = date(hoje.year, hoje.month - 2, 1)

        if hoje.month == 1:
            primeiro_dia_mes_anterior = date(hoje.year - 1, 12, 1)
            primeiro_dia_mes_retrasado = date(hoje.year - 1, 11, 1)

        ultimo_dia_mes_anterior = primeiro_dia_mes_anterior.replace(day=28) + timedelta(days=4)
        ultimo_dia_mes_anterior = ultimo_dia_mes_anterior - timedelta(days=ultimo_dia_mes_anterior.day)

        ultimo_dia_mes_retrasado = primeiro_dia_mes_retrasado.replace(day=28) + timedelta(days=4)
        ultimo_dia_mes_retrasado = ultimo_dia_mes_retrasado - timedelta(days=ultimo_dia_mes_retrasado.day)

        # Volume Financeiro
        volume_anterior = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_anterior, ultimo_dia_mes_anterior]
        ).aggregate(total=Sum("valor"))["total"] or 0

        volume_retrasado = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_retrasado, ultimo_dia_mes_retrasado]
        ).aggregate(total=Sum("valor"))["total"] or 0

        variacao_volume = ((volume_anterior - volume_retrasado) / volume_retrasado * 100) if volume_retrasado else 0

        # Consistência (Número de boletos capturados)
        capturas_anteriores = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_anterior, ultimo_dia_mes_anterior]
        ).count()

        capturas_retrasadas = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_retrasado, ultimo_dia_mes_retrasado]
        ).count()

        variacao_consistencia = ((capturas_anteriores - capturas_retrasadas) / capturas_retrasadas * 100) if capturas_retrasadas else 0

        # Falhas (Boletos vencidos ou cancelados)
        falhas_anteriores = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_anterior, ultimo_dia_mes_anterior],
            status__in=["vencido", "cancelado"]
        ).count()

        falhas_retrasadas = Boleto.objects.filter(
            criado_em__range=[primeiro_dia_mes_retrasado, ultimo_dia_mes_retrasado],
            status__in=["vencido", "cancelado"]
        ).count()

        variacao_falhas = ((falhas_anteriores - falhas_retrasadas) / falhas_retrasadas * 100) if falhas_retrasadas else 0

        # Construindo a resposta
        ranking_bills_kpi = [
            {
                "status": "Volume Financeiro",
                "percentage": f"{variacao_volume:+.1f}%",
                "color": "emerald" if variacao_volume >= 0 else "red",
                "description": "Total acumulado referente ao mês anterior.",
            },
            {
                "status": "Consistência",
                "percentage": f"{variacao_consistencia:+.1f}%",
                "color": "emerald" if variacao_consistencia >= 0 else "red",
                "description": "Consistência de captura de dados referente ao mês anterior.",
            },
            {
                "status": "Falhas",
                "percentage": f"{variacao_falhas:+.1f}%",
                "color": "red" if variacao_falhas >= 0 else "emerald",
                "description": "O total de falhas na extração de boletos referente ao mês anterior.",
            },
        ]

        return Response(ranking_bills_kpi, status=status.HTTP_200_OK)


class MesAnteriorKPIAPIView_old(APIView):

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


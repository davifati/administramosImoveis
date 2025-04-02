from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CronogramaExecucaoBotsView(APIView):

    def get(self, request):
        data = [
            {
                "administradora": "Imobiliária Alpha",
                "dataExecucao": "2024-03-30T14:30:00",
                "status": "Sucesso",
                "estatisticaFalhas": "20%",
            },
            {
                "administradora": "Beta Real Estate",
                "dataExecucao": "2024-03-30T14:30:00",
                "status": "Falha",
                "estatisticaFalhas": "20%",
            },
            {
                "administradora": "Gamma Properties",
                "dataExecucao": "2024-03-30T14:30:00",
                "status": "Sucesso",
                "estatisticaFalhas": "50%",
            },
            {
                "administradora": "Delta Habitação",
                "dataExecucao": "2024-03-30T14:30:00",
                "status": "Falha",
                "estatisticaFalhas": "15%",
            },
        ]
        return Response(data)


class HistoricalExtractionCalendarView(APIView):

    def get(self, request):
        data = [
            {
                "imobiliaria": "APSA",
                "ultimaExtracao": "2025-03-01",
                "proximaExtracao": "2025-03-05",
                "status": "sucesso",
            },
            {
                "imobiliaria": "ABRJ",
                "ultimaExtracao": "2025-03-01",
                "proximaExtracao": "2025-03-06",
                "status": "falha",
            },
            {
                "imobiliaria": "BCF",
                "ultimaExtracao": "2025-03-02",
                "proximaExtracao": "2025-03-07",
                "status": "sucesso",
            },
            {
                "imobiliaria": "Imob 4",
                "ultimaExtracao": "2025-03-02",
                "proximaExtracao": "2025-03-08",
                "status": "inatividade",
            },
            {
                "imobiliaria": "Imob 5",
                "ultimaExtracao": "2025-03-05",
                "proximaExtracao": "2025-03-11",
                "status": "sucesso",
            },
            {
                "imobiliaria": "Imob 6",
                "ultimaExtracao": "2025-03-04",
                "proximaExtracao": "2025-03-10",
                "status": "falha",
            },
            {
                "imobiliaria": "Imob 7",
                "ultimaExtracao": "2025-03-05",
                "proximaExtracao": "2025-03-11",
                "status": "sucesso",
            },
            {
                "imobiliaria": "Imob 8",
                "ultimaExtracao": "2025-03-06",
                "proximaExtracao": "2025-03-12",
                "status": "inatividade",
            },
            {
                "imobiliaria": "Imob 9",
                "ultimaExtracao": "2025-03-07",
                "proximaExtracao": "2025-03-13",
                "status": "sucesso",
            },
            {
                "imobiliaria": "Imob 10",
                "ultimaExtracao": "2025-03-08",
                "proximaExtracao": "2025-03-14",
                "status": "falha",
            },
        ]

        return Response(data, status=status.HTTP_200_OK)

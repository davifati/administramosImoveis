from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Boleto
from .serializers import BoletoSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImobiliariaSerializer


class BoletoViewSet(viewsets.ModelViewSet):

    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer
    permission_classes = [IsAuthenticated]


#


class FalhasBotsImobiliariaView(APIView):
    def get(self, request, *args, **kwargs):
        falhas_bots_imobiliaria = [
            {
                "nome": "Imobiliária Alpha",
                "site": "https://alpha.com",
                "unidade": "Unidade Centro",
                "dadosFalhas": [
                    {"data": "2025-03-31", "motivo": "Erro de autenticação no portal"}
                ],
            },
            {
                "nome": "Imobiliária Beta",
                "site": "https://beta.com",
                "unidade": "Unidade Sul",
                "dadosFalhas": [
                    {"data": "2025-03-31", "motivo": "Boleto não encontrado"}
                ],
            },
            {
                "nome": "Imobiliária Gama",
                "site": "https://gama.com",
                "unidade": "Unidade Norte",
                "dadosFalhas": [
                    {"data": "2025-03-31", "motivo": "Erro de processamento de PDF"}
                ],
            },
        ]

        serializer = ImobiliariaSerializer(falhas_bots_imobiliaria, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


class FailsExtractionTrackerAPIView(APIView):

    def get(self, request):
        # Dados do mock
        falhas_bots_imobiliaria = [
            {
                "nome": "APSA",
                "totalExtracoes": 150,
                "falhas": 15,
                "taxaFalha": 50,
                "dadosFalhas": [
                    {"data": "2025-03-10", "motivo": "Página não carregada"},
                    {"data": "2025-03-12", "motivo": "Erro de conexão"},
                    {"data": "2025-03-14", "motivo": "Timeout da API"},
                ],
            },
            {
                "nome": "ABRJ",
                "totalExtracoes": 120,
                "falhas": 24,
                "taxaFalha": 20,
                "dadosFalhas": [
                    {
                        "data": "2025-03-11",
                        "motivo": "Nao foi possivel extrair os dados do boleto",
                    },
                    {"data": "2025-03-13", "motivo": "Login e/ou Senha Invalido"},
                    {"data": "2025-03-15", "motivo": "Erro de sistema"},
                ],
            },
            {
                "nome": "BCF",
                "totalExtracoes": 180,
                "falhas": 9,
                "taxaFalha": 5,
                "dadosFalhas": [
                    {"data": "2025-03-09", "motivo": "Login e/ou Senha Invalido"},
                    {"data": "2025-03-10", "motivo": "Tempo de resposta excedido"},
                    {"data": "2025-03-13", "motivo": "Site Fora do Ar"},
                ],
            },
            {
                "nome": "PROTEL",
                "totalExtracoes": 100,
                "falhas": 20,
                "taxaFalha": 20,
                "dadosFalhas": [
                    {"data": "2025-03-07", "motivo": "Erro de dados incompletos"},
                    {"data": "2025-03-10", "motivo": "Conflito de versão de API"},
                    {"data": "2025-03-13", "motivo": "Problema de rede"},
                ],
            },
        ]

        # Retornando a resposta com os dados mockados
        return Response(falhas_bots_imobiliaria, status=status.HTTP_200_OK)


class MonthlyStatsView(APIView):
    def get(self, request):
        data = [
            {"date": "01/2023", "Success": 1040, "Errors": 10},
            {"date": "02/2023", "Success": 1200, "Errors": 15},
            {"date": "03/2023", "Success": 1130, "Errors": 20},
            {"date": "04/2023", "Success": 1050, "Errors": 18},
            {"date": "05/2023", "Success": 920, "Errors": 22},
            {"date": "06/2023", "Success": 870, "Errors": 25},
            {"date": "07/2023", "Success": 790, "Errors": 30},
            {"date": "08/2023", "Success": 910, "Errors": 28},
            {"date": "09/2023", "Success": 951, "Errors": 35},
            {"date": "10/2023", "Success": 1232, "Errors": 40},
            {"date": "11/2023", "Success": 1230, "Errors": 45},
            {"date": "12/2023", "Success": 1289, "Errors": 50},
        ]
        return Response(data, status=status.HTTP_200_OK)

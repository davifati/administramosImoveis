from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ImoveisAPIView(APIView):

    def get(self, request, *args, **kwargs) -> Response:
        mockFullImoveisInfo = [
            {
                "administradora": "Alpha",
                "administracao": "Barra One",
                "boleto": 13350,
                "data_extracao_boletos": "14/10/2024",
                "estado": "RJ",
                "status": None,
            },
            {
                "administradora": "Beta",
                "administracao": "Carra One",
                "boleto": 14350,
                "data_extracao_boletos": "15/10/2024",
                "estado": "RJ",
                "status": None,
            },
            {
                "administradora": "Ceta",
                "administracao": "Darra One",
                "boleto": 15350,
                "data_extracao_boletos": "16/10/2024",
                "estado": "RJ",
                "status": None,
            },
            {
                "administradora": "Delta",
                "administracao": "Darra One",
                "boleto": 15350,
                "data_extracao_boletos": "16/10/2024",
                "estado": "RJ",
                "status": None,
            },
        ]

        return Response(mockFullImoveisInfo, status=status.HTTP_200_OK)

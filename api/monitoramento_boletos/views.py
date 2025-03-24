from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Boleto
from .serializers import BoletoSerializer


class BoletoViewSet(viewsets.ModelViewSet):

    queryset = Boleto.objects.all()
    serializer_class = BoletoSerializer
    permission_classes = [IsAuthenticated]

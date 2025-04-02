from rest_framework import viewsets
from imoveis.models.unidade import Unidade
from imoveis.serializers.unidade import UnidadeSerializer


class UnidadeViewSet(viewsets.ModelViewSet):
    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer

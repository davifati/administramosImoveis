from rest_framework import viewsets
from imoveis.models.unidade import Unidade
from imoveis.serializers.unidade import UnidadeSerializer


class UnidadeViewSet(viewsets.ModelViewSet):
    """
    Gerencia as Unidades dos Condomínios/Imóveis
    """

    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer

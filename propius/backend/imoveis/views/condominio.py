from rest_framework import viewsets
from imoveis.models.condominio import Condominio
from imoveis.serializers.condominio import CondominioSerializer


class CondominioViewSet(viewsets.ModelViewSet):
    """
    Gerencia os Condomínios das Unidades/Imóveis
    """

    queryset = Condominio.objects.all()
    serializer_class = CondominioSerializer

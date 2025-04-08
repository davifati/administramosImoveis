from rest_framework import viewsets
from imoveis.models.administradora import Administradora
from imoveis.serializers.administradora import AdministradoraSerializer


class AdministradoraViewSet(viewsets.ModelViewSet):
    """
    Gerencia as Administradoras dos Condomínios/Unidades/Imóveis
    """

    queryset = Administradora.objects.all()
    serializer_class = AdministradoraSerializer

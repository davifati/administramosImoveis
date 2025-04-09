from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from imoveis.models import Administradora, Condominio, Unidade
from imoveis.serializers import (
    AdministradoraSerializer,
    CondominioSerializer,
    UnidadeSerializer,
    AtivoImovelSerializer,
)
from drf_spectacular.utils import extend_schema


@extend_schema(tags=["Imóveis"])
class AtivosLocaticiosViewSet(viewsets.ViewSet):
    """
    Gerencia informações completas dos ativos imobiliários, incluindo Administradora,
    Condomínios e Unidades.
    """

    def _validate_and_save_data(self, serializer_class, data_list):
        """
        Helper method to validate and save data using provided serializer
        """
        objects = []
        for item_data in data_list:
            serializer = serializer_class(data=item_data)
            if not serializer.is_valid():
                return None, serializer.errors
            objects.append(serializer.save())
        return objects, None

    @action(detail=False, methods=["get"], url_path="info")
    def info_ativos_imoveis(self, request) -> Response:
        """
        Retorna informações detalhadas de todos os ativos imobiliários
        """
        unidades = Unidade.objects.select_related(
            "condominio", "condominio__administradora"
        ).all()

        serializer = AtivoImovelSerializer(unidades, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="cadastro")
    def register_ativos(self, request):
        """
        Cadastra informações completas dos ativos imobiliários
        """
        data = request.data

        # Process each data type using helper method
        administradoras, errors = self._validate_and_save_data(
            AdministradoraSerializer, data.get("administradoras", [])
        )
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        condominios, errors = self._validate_and_save_data(
            CondominioSerializer, data.get("condominios", [])
        )
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        unidades, errors = self._validate_and_save_data(
            UnidadeSerializer, data.get("unidades", [])
        )
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare response data
        response_data = {
            "administradoras": AdministradoraSerializer(
                administradoras, many=True
            ).data,
            "condominios": CondominioSerializer(condominios, many=True).data,
            "unidades": UnidadeSerializer(unidades, many=True).data,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

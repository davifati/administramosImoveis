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


class AtivosLocaticiosViewSet(viewsets.ViewSet):
    """
    Retorna informações completas do ativo imovel, isto é, dados de Administradora, Administração, Condominios, Unidades.
    """

    @action(detail=False, methods=["get"], url_path="info")
    def info_ativos_imoveis(self, request) -> Response:
        unidades = Unidade.objects.select_related(
            "condominio", "condominio__administradora"
        ).all()

        data = AtivoImovelSerializer(unidades, many=True).data
        return Response(data, status=status.HTTP_200_OK)

    # TODO: DELETE ME
    @action(detail=False, methods=["get"], url_path="info_old")
    def info_ativos_imoveis_old(self, request) -> Response:
        administradoras = Administradora.objects.all()
        condominios = Condominio.objects.all()
        unidades = Unidade.objects.all()

        administradoras_serialized = AdministradoraSerializer(
            administradoras, many=True
        )
        condominios_serialized = CondominioSerializer(condominios, many=True)
        unidades_serialized = UnidadeSerializer(unidades, many=True)

        data = {
            "administradoras": administradoras_serialized.data,
            "condominios": condominios_serialized.data,
            "unidades": unidades_serialized.data,
        }

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="cadastro")
    def register_ativos(self, request):
        """
        Cadastre informações completas do ativo imovel, isto é, dados de Administradora, Administração, Condominios, Unidades.
        """

        data = request.data
        administradora_data = data.get("administradoras", [])
        condominio_data = data.get("condominios", [])
        unidade_data = data.get("unidades", [])

        administradoras = []
        for admin_data in administradora_data:
            serializer = AdministradoraSerializer(data=admin_data)
            if serializer.is_valid():
                administradoras.append(serializer.save())
            else:
                return Response(
                    {"errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        condominios = []
        for condominio_data in condominio_data:
            serializer = CondominioSerializer(data=condominio_data)
            if serializer.is_valid():
                condominios.append(serializer.save())
            else:
                return Response(
                    {"errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        unidades = []
        for unidade_data in unidade_data:
            serializer = UnidadeSerializer(data=unidade_data)
            if serializer.is_valid():
                unidades.append(serializer.save())
            else:
                return Response(
                    {"errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {
                "administradoras": AdministradoraSerializer(
                    administradoras, many=True
                ).data,
                "condominios": CondominioSerializer(condominios, many=True).data,
                "unidades": UnidadeSerializer(unidades, many=True).data,
            },
            status=status.HTTP_201_CREATED,
        )

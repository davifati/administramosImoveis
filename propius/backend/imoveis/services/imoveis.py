from imoveis.models.administradora import Administradora
from imoveis.models.condominio import Condominio
from imoveis.models.unidade import Unidade
from imoveis.serializers.administradora import AdministradoraSerializer
from imoveis.serializers.condominio import CondominioSerializer
from imoveis.serializers.unidade import UnidadeSerializer
from django.core.paginator import Paginator


class ImoveisService:

    @staticmethod
    def build_imoveis_info():
        administradoras = Administradora.objects.all()
        condominios = Condominio.objects.select_related("administradora").all()
        unidades = Unidade.objects.select_related(
            "condominio", "condominio__administradora"
        ).all()

        response_data = {
            "administradoras": AdministradoraSerializer(
                administradoras, many=True
            ).data,
            "condominios": CondominioSerializer(condominios, many=True).data,
            "unidades": UnidadeSerializer(unidades, many=True).data,
        }

        return response_data

    @staticmethod
    def build_imoveis_info_paginated(page=1, page_size=10):
        """
        Constrói informações paginadas de todos os ativos imobiliários.

        Args:
            page (int): Número da página (começa em 1)
            page_size (int): Número de itens por página

        Returns:
            dict: Dicionário com informações paginadas de administradoras, condomínios e unidades
        """
        administradoras = Administradora.objects.all()
        condominios = Condominio.objects.select_related("administradora").all()
        unidades = Unidade.objects.select_related(
            "condominio", "condominio__administradora"
        ).all()

        admin_paginator = Paginator(administradoras, page_size)
        cond_paginator = Paginator(condominios, page_size)
        unit_paginator = Paginator(unidades, page_size)

        admin_page = admin_paginator.get_page(page)
        cond_page = cond_paginator.get_page(page)
        unit_page = unit_paginator.get_page(page)

        response_data = {
            "administradoras": {
                "results": AdministradoraSerializer(admin_page, many=True).data,
                "total_pages": admin_paginator.num_pages,
                "current_page": page,
                "total_items": admin_paginator.count,
            },
            "condominios": {
                "results": CondominioSerializer(cond_page, many=True).data,
                "total_pages": cond_paginator.num_pages,
                "current_page": page,
                "total_items": cond_paginator.count,
            },
            "unidades": {
                "results": UnidadeSerializer(unit_page, many=True).data,
                "total_pages": unit_paginator.num_pages,
                "current_page": page,
                "total_items": unit_paginator.count,
            },
        }

        return response_data

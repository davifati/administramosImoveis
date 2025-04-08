from django.contrib import admin
from imoveis.models import Unidade


@admin.register(Unidade)
class UnidadeAdmin(admin.ModelAdmin):
    list_display = ("unidade", "condominio", "pasta", "cep")
    search_fields = ("unidade", "condominio__nome")
    list_filter = ("condominio",)

    exclude = ("deletado_em",)

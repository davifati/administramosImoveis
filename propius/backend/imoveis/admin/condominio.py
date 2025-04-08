from django.contrib import admin
from imoveis.models import Condominio


@admin.register(Condominio)
class CondominioAdmin(admin.ModelAdmin):
    list_display = ("nome", "administradora", "cep", "email", "telefone")
    search_fields = ("nome", "administradora__nome")
    list_filter = ("administradora",)

    exclude = ("deletado_em",)

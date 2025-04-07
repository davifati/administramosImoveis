from django.contrib import admin
from imoveis.models import Administradora


@admin.register(Administradora)
class AdministradoraAdmin(admin.ModelAdmin):
    list_display = ("nome", "email", "quantidade_imoveis", "telefone", "site")
    search_fields = ("nome", "email")
    list_filter = ("quantidade_imoveis",)

    exclude = ("deletado_em",)

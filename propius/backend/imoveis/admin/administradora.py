from django.contrib import admin
from imoveis.models import Administradora


@admin.register(Administradora)
class AdministradoraAdmin(admin.ModelAdmin):
    search_fields = ("nome", "email")

    exclude = ("deletado_em",)

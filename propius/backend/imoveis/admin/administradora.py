from django.contrib import admin
from imoveis.models import Administradora


@admin.register(Administradora)
class AdministradoraAdmin(admin.ModelAdmin):

    exclude = ("deletado_em",)

from django.contrib import admin
from imoveis.models import Condominio


@admin.register(Condominio)
class CondominioAdmin(admin.ModelAdmin):

    exclude = ("deletado_em",)

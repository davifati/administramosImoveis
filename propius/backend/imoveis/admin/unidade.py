from django.contrib import admin
from imoveis.models import Unidade


@admin.register(Unidade)
class UnidadeAdmin(admin.ModelAdmin):

    exclude = ("deletado_em",)

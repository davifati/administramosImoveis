from django.contrib import admin
from .models import Boleto


@admin.register(Boleto)
class BoletoAdmin(admin.ModelAdmin):
    exclude = ("deletado_em",)

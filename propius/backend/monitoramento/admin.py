from django.contrib import admin
from .models import Boleto


@admin.register(Boleto)
class BoletoAdmin(admin.ModelAdmin):
    list_display = (
        "unidade",
        "data_vencimento",
        "valor",
        "linha_digitavel",
        "status",
        "criado_em",
        "atualizado_em",
    )

    search_fields = ("linha_digitavel", "unidade__numero_unidade", "status")
    list_filter = ("status", "data_vencimento", "unidade")

    fields = (
        "unidade",
        "data_vencimento",
        "valor",
        "linha_digitavel",
        "link_pdf",
        "status",
    )

    fields = ()
    exclude = ("deletado_em",)

    ordering = ["data_vencimento"]

    def marcar_como_pago(modeladmin, request, queryset):
        queryset.update(status="pago")

    marcar_como_pago.short_description = "Marcar como Pago"

    actions = [marcar_como_pago]

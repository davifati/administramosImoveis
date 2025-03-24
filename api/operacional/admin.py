from django.contrib import admin
from django.contrib.admin import AdminSite

from operacional.models import Plano, HistoricoCobranca, Cobranca
from login.models.usuario import Cliente, Usuario


admin.site.register(Cliente)
admin.site.register(model_or_iterable=Usuario)


admin.site.register(model_or_iterable=Plano)
admin.site.register(model_or_iterable=Cobranca)
admin.site.register(model_or_iterable=HistoricoCobranca)

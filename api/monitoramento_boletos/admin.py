import django
from django.contrib import admin

from monitoramento_boletos.tests import Boleto


admin.site.register(Boleto)
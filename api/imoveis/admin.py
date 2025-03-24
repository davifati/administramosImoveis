from django.contrib import admin
from .models import Administradora, Condominio, Unidade, Proprietario, Inquilino


@admin.register(Administradora)
class AdministradoraAdmin(admin.ModelAdmin):
    list_display = ("nome", "email", "quantidade_imoveis", "telefone", "site")
    search_fields = ("nome", "email")
    list_filter = ("quantidade_imoveis",)


@admin.register(Condominio)
class CondominioAdmin(admin.ModelAdmin):
    list_display = ("nome", "administradora", "cep", "email", "telefone")
    search_fields = ("nome", "administradora__nome")
    list_filter = ("administradora",)


@admin.register(Unidade)
class UnidadeAdmin(admin.ModelAdmin):
    list_display = ("unidade", "condominio", "proprietario", "pasta", "cep")
    search_fields = ("unidade", "condominio__nome", "proprietario__nome")
    list_filter = ("condominio",)


@admin.register(Proprietario)
class ProprietarioAdmin(admin.ModelAdmin):
    list_display = ("nome", "cpf", "rg", "telefone", "email")
    search_fields = ("nome", "cpf", "email")


@admin.register(Inquilino)
class InquilinoAdmin(admin.ModelAdmin):
    list_display = ("nome", "unidade", "email", "telefone")
    search_fields = ("nome", "unidade__unidade", "email")
    list_filter = ("unidade",)

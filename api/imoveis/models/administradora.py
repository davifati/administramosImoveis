from django.db import models
from utils.abstract_model import BaseModelTimeStamped


class Administradora(BaseModelTimeStamped):

    nome = models.CharField(max_length=200, verbose_name="Nome")
    email = models.EmailField(max_length=200, unique=True, verbose_name="E-mail")
    site = models.URLField(max_length=200, blank=True, null=True, verbose_name="Site")
    telefone = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="Telefone"
    )

    quantidade_imoveis = models.IntegerField(
        default=0, verbose_name="Quantidade de Imóveis"
    )

    class Meta:
        verbose_name = "Administradora"
        verbose_name_plural = "Administradoras"
        ordering = ["nome"]

    def __str__(self):
        return self.nome

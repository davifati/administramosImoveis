from django.db import models
from utils.abstract_model import BaseModelTimeStamped, BaseModelEndereco


class Administradora(BaseModelTimeStamped):
    """
    Administradora é a empresa que gerencia os imóveis.
    """

    nome = models.CharField(max_length=200, verbose_name="Nome")
    email = models.EmailField(max_length=200, unique=True, verbose_name="E-mail")
    site = models.URLField(max_length=200, blank=True, null=True, verbose_name="Site")
    # endereco = models.OneToOneField(
    #     BaseModelEndereco,
    #     on_delete=models.CASCADE,
    #     related_name="administradora",
    #     null=True,
    #     blank=True,
    # )
    telefone = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="Telefone"
    )
    endereco = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="Endereço"
    )
    complemento = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="Complemento"
    )
    numero = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="Número"
    )
    cep = models.CharField(max_length=100, null=True, blank=True, verbose_name="CEP")

    class Meta:
        verbose_name = "Administradora"
        verbose_name_plural = "Administradoras"
        ordering = ["nome"]

    def __str__(self):
        return self.nome

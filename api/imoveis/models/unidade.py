from django.db import models
from utils.abstract_model import BaseModelTimeStamped
from .condominio import Condominio


class Unidade(BaseModelTimeStamped):

    condominio = models.ForeignKey(
        Condominio,
        on_delete=models.CASCADE,
        related_name="unidades",
        verbose_name="Condomínio da qual a unidade faz parte",
        help_text="Refere-se à unidade responsável por esse condomínio.",
    )

    bloco = models.CharField(max_length=50, blank=True, null=True, verbose_name="Bloco")
    unidade = models.IntegerField(verbose_name="Número da Unidade")
    cep = models.CharField(max_length=20, blank=True, null=True, verbose_name="CEP")
    pasta = models.IntegerField(unique=True, verbose_name="Número da Pasta")

    login = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="Login"
    )
    senha = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Senha"
    )

    class Meta:
        verbose_name = "Unidade"
        verbose_name_plural = "Unidades"
        ordering = ["condominio", "unidade"]

    def __str__(self):
        return f"Unidade {self.unidade} - {self.condominio.nome}"

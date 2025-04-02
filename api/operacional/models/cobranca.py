from django.db import models
from django.conf import settings
from datetime import datetime


class Plano(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Plano")
    descricao = models.TextField(
        verbose_name="Descrição do Plano", blank=True, null=True
    )
    preco = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Preço Anual"
    )
    duracao = models.IntegerField(default=1, verbose_name="Duração do Plano (em anos)")

    def __str__(self):
        return f"{self.nome} - {self.preco} por {self.duracao} ano(s)"

    class Meta:
        verbose_name = "Plano"
        verbose_name_plural = "Planos"


class Cobranca(models.Model):
    cliente = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Cliente"
    )
    plano = models.ForeignKey(Plano, on_delete=models.CASCADE, verbose_name="Plano")
    valor_pago = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Valor Pago"
    )
    data_inicial = models.DateField(default=datetime.now, verbose_name="Data de Início")
    data_final = models.DateField(verbose_name="Data de Término", blank=True, null=True)
    data_pagamento = models.DateTimeField(
        auto_now_add=True, verbose_name="Data de Pagamento"
    )
    status_pagamento = models.CharField(
        max_length=50,
        choices=[("pendente", "Pendente"), ("pago", "Pago")],
        default="pendente",
        verbose_name="Status do Pagamento",
    )

    def save(self, *args, **kwargs):
        # Calculando a data de término com base na duração do plano (normalmente 1 ano)
        if not self.data_final:
            self.data_final = self.data_inicial.replace(
                year=self.data_inicial.year + self.plano.duracao
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Cobrança {self.id} - {self.cliente} - {self.plano} - {self.status_pagamento}"

    class Meta:
        verbose_name = "Cobrança"
        verbose_name_plural = "Cobranças"


class HistoricoCobranca(models.Model):
    cobrança = models.ForeignKey(
        Cobranca,
        on_delete=models.CASCADE,
        related_name="historico_cobrancas",
        verbose_name="Cobrança",
    )
    status_anterior = models.CharField(
        max_length=50,
        choices=[("pendente", "Pendente"), ("pago", "Pago")],
        verbose_name="Status Anterior",
    )
    status_novo = models.CharField(
        max_length=50,
        choices=[("pendente", "Pendente"), ("pago", "Pago")],
        verbose_name="Status Novo",
    )
    data_alteracao = models.DateTimeField(
        auto_now_add=True, verbose_name="Data da Alteração"
    )

    def __str__(self):
        return f"Histórico da Cobrança {self.cobrança.id} - {self.status_anterior} -> {self.status_novo}"

    class Meta:
        verbose_name = "Histórico de Cobrança"
        verbose_name_plural = "Históricos de Cobranças"

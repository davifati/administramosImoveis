from django.db import models
from utils.abstract_model import BaseModelTimeStamped, BasePessoa


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


class Condominio(BaseModelTimeStamped):

    administradora = models.ForeignKey(
        Administradora,
        on_delete=models.CASCADE,
        related_name="condominios",
        verbose_name="Administradora da qual o condomínio faz parte",
        help_text="Refere-se à administradora responsável por esse condomínio.",
    )
    nome = models.CharField(max_length=200, verbose_name="Nome do Condomínio")
    endereco = models.CharField(max_length=200, verbose_name="Endereço")
    complemento = models.CharField(
        max_length=200, blank=True, null=True, verbose_name="Complemento"
    )
    numero = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Número do Imóvel"
    )
    cep = models.CharField(max_length=20, verbose_name="CEP")
    email = models.EmailField(max_length=200, unique=True, verbose_name="E-mail")
    telefone = models.CharField(
        max_length=100, blank=True, null=True, verbose_name="Telefone"
    )

    class Meta:
        verbose_name = "Condomínio"
        verbose_name_plural = "Condomínios"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Unidade(BaseModelTimeStamped):

    condominio = models.ForeignKey(
        Condominio,
        on_delete=models.CASCADE,
        related_name="unidades",
        verbose_name="Condomínio em que a unidade está localizada",
        help_text="unidade pertence a um condomínio específico.",
    )

    proprietario = models.OneToOneField(
        "Proprietario",
        on_delete=models.CASCADE,
        related_name="unidade",
        verbose_name="Proprietário da unidade",
        help_text="Este é o proprietário da unidade, cada unidade tem um único proprietário.",
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


class Proprietario(BasePessoa):
    """Proprietário da unidade"""

    class Meta:
        verbose_name = "Proprietário"
        verbose_name_plural = "Proprietários"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Inquilino(BasePessoa):
    """Inquilino que aluga uma unidade"""

    unidade = models.ForeignKey(
        "Unidade",
        on_delete=models.CASCADE,
        related_name="inquilinos",
        verbose_name="Unidade Alugada",
        help_text="Refere-se à unidade da qual o inquilino é responsável por alugar.",
    )

    class Meta:
        verbose_name = "Inquilino"
        verbose_name_plural = "Inquilinos"
        ordering = ["nome"]

    def __str__(self):
        return self.nome

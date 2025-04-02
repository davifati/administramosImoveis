import random
from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from utils.abstract_model import BaseModelTimeStamped


class Cliente(BaseModelTimeStamped):
    cnpj = models.CharField(
        max_length=25, unique=True, blank=True, null=True, verbose_name="CNPJ"
    )

    def __str__(self):
        return self.cnpj

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"


class Perfil(models.Model):
    PERFIS_CHOICES = [
        ("superadmin", "Superadministrador"),
        ("admin", "Administrador"),
        ("administrativo", "Administrativo"),
        ("convidado", "Convidado"),
    ]

    nome = models.CharField(
        max_length=50,
        choices=PERFIS_CHOICES,
        verbose_name="Perfil",
        null=True,
        blank=True,
    )

    # Grupo Django relacionado ao perfil
    grupo = models.OneToOneField(
        Group, on_delete=models.CASCADE, related_name="perfil", null=True, blank=True
    )

    class Meta:
        verbose_name = "Perfil"
        verbose_name_plural = "Perfis"
        ordering = ["nome"]

    def __str__(self):
        return self.get_nome_display()


class Usuario(AbstractUser):
    # Remover campos que não serão utilizados, como first_name e last_name
    first_name = None
    last_name = None
    date_joined = None

    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE,
        related_name="usuarios",
        verbose_name="Cliente",
        blank=True,
        null=True,
    )

    """
    perfil = models.ForeignKey(
        Perfil,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="usuarios_perfil",
        verbose_name="Perfil de Acesso",
        default=None,
    )
    """

    entrada_em = models.DateTimeField(
        auto_now_add=True, verbose_name="Entrada em", blank=True, null=True
    )

    nome = models.CharField(
        max_length=200, verbose_name="Nome", null=False, blank=False
    )
    sobrenome = models.CharField(
        max_length=200, verbose_name="Sobrenome", null=False, blank=False
    )

    email = models.EmailField(
        max_length=200, unique=True, verbose_name="E-mail", blank=True, null=True
    )

    def save(self, *args, **kwargs):
        # Gerar username automaticamente se não existir
        if not self.username:
            # Criar username com a junção do nome, sobrenome e 6 números aleatórios
            random_numbers = "".join([str(random.randint(0, 9)) for _ in range(6)])
            self.username = (
                f"{self.nome.lower()}{self.sobrenome.lower()}{random_numbers}"
            )

        # Garantir que o username seja único
        while Usuario.objects.filter(username=self.username).exists():
            random_numbers = "".join([str(random.randint(0, 9)) for _ in range(6)])
            self.username = (
                f"{self.nome.lower()}{self.sobrenome.lower()}{random_numbers}"
            )

      
        super().save(*args, **kwargs)

    class Meta:
        db_table = "usuarios"

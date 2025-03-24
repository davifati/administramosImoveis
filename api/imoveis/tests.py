from django.test import TestCase
from .models import Administradora, Condominio, Unidade, Proprietario, Inquilino


class ModelTestCase(TestCase):

    def setUp(self):
        """Configuração inicial para os testes."""
        # Criar uma administradora
        self.administradora = Administradora.objects.create(
            nome="Administradora A",
            email="admin@exemplo.com",
            telefone="123456789",
            quantidade_imoveis=50,
        )

        # Criar um condomínio associado à administradora
        self.condominio = Condominio.objects.create(
            administradora=self.administradora,
            nome="Condomínio X",
            endereco="Rua A, 123",
            cep="12345-678",
            email="condominio@exemplo.com",
            telefone="987654321",
        )

        # Criar um proprietário
        self.proprietario = Proprietario.objects.create(
            nome="João Silva",
            email="joao.silva@exemplo.com",
            telefone="555-1234",
        )

        # Criar uma unidade associada ao condomínio e ao proprietário
        self.unidade = Unidade.objects.create(
            condominio=self.condominio,
            proprietario=self.proprietario,
            bloco="A",
            unidade=101,
            cep="12345-678",
            pasta=1,
        )

        # Criar um inquilino associado à unidade
        self.inquilino = Inquilino.objects.create(
            nome="Maria Oliveira",
            email="maria.oliveira@exemplo.com",
            telefone="555-9876",
            unidade=self.unidade,
        )

    def test_administradora_creation(self):
        """Teste de criação do modelo Administradora"""
        self.assertEqual(self.administradora.nome, "Administradora A")
        self.assertEqual(self.administradora.email, "admin@exemplo.com")
        self.assertEqual(self.administradora.quantidade_imoveis, 50)
        self.assertTrue(
            self.administradora.id
        )  # Verifica se a administradora foi salva com um ID

    def test_condominio_creation(self):
        """Teste de criação do modelo Condominio"""
        self.assertEqual(self.condominio.nome, "Condomínio X")
        self.assertEqual(self.condominio.endereco, "Rua A, 123")
        self.assertEqual(self.condominio.cep, "12345-678")
        self.assertEqual(self.condominio.administradora, self.administradora)
        self.assertTrue(
            self.condominio.id
        )  # Verifica se o condomínio foi salvo com um ID

    def test_unidade_creation(self):
        """Teste de criação do modelo Unidade"""
        self.assertEqual(self.unidade.unidade, 101)
        self.assertEqual(self.unidade.bloco, "A")
        self.assertEqual(self.unidade.condominio, self.condominio)
        self.assertEqual(self.unidade.proprietario, self.proprietario)
        self.assertTrue(self.unidade.id)  # Verifica se a unidade foi salva com um ID

    def test_proprietario_creation(self):
        """Teste de criação do modelo Proprietario"""
        self.assertEqual(self.proprietario.nome, "João Silva")
        self.assertEqual(self.proprietario.email, "joao.silva@exemplo.com")
        self.assertEqual(self.proprietario.telefone, "555-1234")
        self.assertTrue(
            self.proprietario.id
        )  # Verifica se o proprietário foi salvo com um ID

    def test_inquilino_creation(self):
        """Teste de criação do modelo Inquilino"""
        self.assertEqual(self.inquilino.nome, "Maria Oliveira")
        self.assertEqual(self.inquilino.email, "maria.oliveira@exemplo.com")
        self.assertEqual(self.inquilino.unidade, self.unidade)
        self.assertTrue(
            self.inquilino.id
        )  # Verifica se o inquilino foi salvo com um ID

    def test_str_method_administradora(self):
        """Teste do método __str__ do modelo Administradora"""
        self.assertEqual(str(self.administradora), "Administradora A")

    def test_str_method_condominio(self):
        """Teste do método __str__ do modelo Condominio"""
        self.assertEqual(str(self.condominio), "Condomínio X")

    def test_str_method_unidade(self):
        """Teste do método __str__ do modelo Unidade"""
        self.assertEqual(
            str(self.unidade),
            f"Unidade {self.unidade.unidade} - {self.condominio.nome}",
        )

    def test_str_method_proprietario(self):
        """Teste do método __str__ do modelo Proprietario"""
        self.assertEqual(str(self.proprietario), "João Silva")

    def test_str_method_inquilino(self):
        """Teste do método __str__ do modelo Inquilino"""
        self.assertEqual(str(self.inquilino), "Maria Oliveira")

    def test_email_unique_administradora(self):
        """Teste de unicidade do email da administradora"""
        with self.assertRaises(Exception):
            Administradora.objects.create(
                nome="Administradora B",
                email="admin@exemplo.com",  # Email duplicado
                telefone="987654321",
                quantidade_imoveis=30,
            )

    def test_email_unique_condominio(self):
        """Teste de unicidade do email do condomínio"""
        with self.assertRaises(Exception):
            Condominio.objects.create(
                administradora=self.administradora,
                nome="Condomínio Y",
                endereco="Rua B, 456",
                cep="67890-123",
                email="condominio@exemplo.com",  # Email duplicado
                telefone="123987654",
            )

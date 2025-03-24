from django.test import TestCase
from django.utils import timezone
from imoveis.models import Unidade
from .models import Boleto


class BoletoModelTest(TestCase):

    def setUp(self):
        """Configuração inicial para os testes."""
        # Criação de uma unidade fictícia para associar ao boleto
        self.unidade = Unidade.objects.create(
            bloco="A",
            num_unidade="101",
            nome_proprietario="João Silva",
            login="joao.silva",
            senha="senha_forte",
        )

    def test_boleto_creation(self):
        """Teste de criação do modelo Boleto."""
        # Criação do boleto
        boleto = Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=250.00,
            linha_digitavel="12345678901234567890123456789012345678901234",
            link_pdf="http://example.com/boleto.pdf",
            status="a vencer",
        )

        # Verificar se o boleto foi criado corretamente
        self.assertEqual(boleto.unidade, self.unidade)
        self.assertEqual(boleto.data_vencimento, "2025-04-01")
        self.assertEqual(boleto.valor, 250.00)
        self.assertEqual(
            boleto.linha_digitavel, "12345678901234567890123456789012345678901234"
        )
        self.assertEqual(boleto.link_pdf, "http://example.com/boleto.pdf")
        self.assertEqual(boleto.status, "a vencer")
        self.assertTrue(
            boleto.id
        )  # Verifica se o boleto foi salvo com um ID (ou seja, foi criado)

    def test_boleto_default_status(self):
        """Teste se o status padrão do boleto é 'a vencer'."""
        boleto = Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=300.00,
            linha_digitavel="23456789012345678901234567890123456789012345",
        )
        self.assertEqual(boleto.status, "a vencer")

    def test_boleto_str_method(self):
        """Teste do método __str__ do modelo Boleto."""
        boleto = Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=300.00,
            linha_digitavel="23456789012345678901234567890123456789012345",
        )
        self.assertEqual(
            str(boleto),
            f"Boleto {boleto.linha_digitavel} - {boleto.unidade.num_unidade}",
        )

    def test_boleto_status_choices(self):
        """Teste se as escolhas de status funcionam corretamente."""
        boleto = Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=300.00,
            linha_digitavel="23456789012345678901234567890123456789012345",
            status="pago",
        )
        self.assertEqual(boleto.status, "pago")

        boleto.status = "vencido"
        boleto.save()
        self.assertEqual(boleto.status, "vencido")

    def test_boleto_invalid_linha_digitavel(self):
        """Teste para garantir que a linha_digitavel seja única."""
        Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=100.00,
            linha_digitavel="12345678901234567890123456789012345678901234",
        )
        with self.assertRaises(Exception):  # Espera-se uma exceção devido à duplicidade
            Boleto.objects.create(
                unidade=self.unidade,
                data_vencimento="2025-05-01",
                valor=150.00,
                linha_digitavel="12345678901234567890123456789012345678901234",
            )

    def test_boleto_link_pdf_blank(self):
        """Teste para garantir que o link_pdf pode ser vazio."""
        boleto = Boleto.objects.create(
            unidade=self.unidade,
            data_vencimento="2025-04-01",
            valor=200.00,
            linha_digitavel="56789012345678901234567890123456789012345678",
            link_pdf="",  # Não fornecendo um link
            status="a vencer",
        )
        self.assertEqual(boleto.link_pdf, "")  # link_pdf deve ser vazio

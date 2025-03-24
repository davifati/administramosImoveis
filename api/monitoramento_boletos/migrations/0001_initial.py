# Generated by Django 5.1.6 on 2025-03-23 21:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('imoveis', '0002_proprietario_alter_unidade_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Boleto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criado_em', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('atualizado_em', models.DateTimeField(auto_now=True, verbose_name='Atualizado em')),
                ('deletado_em', models.DateTimeField(blank=True, null=True, verbose_name='Deletado em')),
                ('data_vencimento', models.DateField(help_text='Data de vencimento do boleto.', verbose_name='Data de Vencimento')),
                ('valor', models.DecimalField(decimal_places=2, help_text='Valor do boleto.', max_digits=16, verbose_name='Valor')),
                ('linha_digitavel', models.CharField(help_text='Linha digitável do boleto (única).', max_length=200, unique=True, verbose_name='Linha Digitável')),
                ('link_pdf', models.URLField(blank=True, help_text='Link para o PDF do boleto.', max_length=255, null=True, verbose_name='Link do PDF')),
                ('status', models.CharField(choices=[('vencido', 'Vencido'), ('pago', 'Pago'), ('cancelado', 'Cancelado'), ('a vencer', 'A Vencer')], default='a vencer', max_length=10, verbose_name='Status')),
                ('unidade', models.ForeignKey(help_text='A unidade à qual o boleto pertence.', on_delete=django.db.models.deletion.CASCADE, related_name='boletos', to='imoveis.unidade', verbose_name='Unidade')),
            ],
            options={
                'verbose_name': 'Boleto',
                'verbose_name_plural': 'Boletos',
                'ordering': ['data_vencimento'],
            },
        ),
    ]

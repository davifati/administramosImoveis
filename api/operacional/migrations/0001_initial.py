# Generated by Django 5.1.6 on 2025-03-24 16:10

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Plano',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='Nome do Plano')),
                ('descricao', models.TextField(blank=True, null=True, verbose_name='Descrição do Plano')),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Preço Anual')),
                ('duracao', models.IntegerField(default=1, verbose_name='Duração do Plano (em anos)')),
            ],
            options={
                'verbose_name': 'Plano',
                'verbose_name_plural': 'Planos',
            },
        ),
        migrations.CreateModel(
            name='Cobranca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor_pago', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Valor Pago')),
                ('data_inicial', models.DateField(default=datetime.datetime.now, verbose_name='Data de Início')),
                ('data_final', models.DateField(blank=True, null=True, verbose_name='Data de Término')),
                ('data_pagamento', models.DateTimeField(auto_now_add=True, verbose_name='Data de Pagamento')),
                ('status_pagamento', models.CharField(choices=[('pendente', 'Pendente'), ('pago', 'Pago')], default='pendente', max_length=50, verbose_name='Status do Pagamento')),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Cliente')),
                ('plano', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='operacional.plano', verbose_name='Plano')),
            ],
            options={
                'verbose_name': 'Cobrança',
                'verbose_name_plural': 'Cobranças',
            },
        ),
        migrations.CreateModel(
            name='HistoricoCobranca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_anterior', models.CharField(choices=[('pendente', 'Pendente'), ('pago', 'Pago')], max_length=50, verbose_name='Status Anterior')),
                ('status_novo', models.CharField(choices=[('pendente', 'Pendente'), ('pago', 'Pago')], max_length=50, verbose_name='Status Novo')),
                ('data_alteracao', models.DateTimeField(auto_now_add=True, verbose_name='Data da Alteração')),
                ('cobrança', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='historico_cobrancas', to='operacional.cobranca', verbose_name='Cobrança')),
            ],
            options={
                'verbose_name': 'Histórico de Cobrança',
                'verbose_name_plural': 'Históricos de Cobranças',
            },
        ),
    ]

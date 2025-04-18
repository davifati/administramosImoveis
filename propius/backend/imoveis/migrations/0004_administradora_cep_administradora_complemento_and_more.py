# Generated by Django 5.2 on 2025-04-10 03:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imoveis', '0003_alter_administradora_endereco'),
    ]

    operations = [
        migrations.AddField(
            model_name='administradora',
            name='cep',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='CEP'),
        ),
        migrations.AddField(
            model_name='administradora',
            name='complemento',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Complemento'),
        ),
        migrations.AddField(
            model_name='administradora',
            name='numero',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Número'),
        ),
    ]

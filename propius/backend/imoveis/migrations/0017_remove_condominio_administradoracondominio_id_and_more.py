# Generated by Django 5.2 on 2025-04-10 23:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('imoveis', '0016_alter_unidade_unidade'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='condominio',
            name='administradoracondominio_id',
        ),
        migrations.RemoveField(
            model_name='unidade',
            name='administracaocondominio_id',
        ),
    ]

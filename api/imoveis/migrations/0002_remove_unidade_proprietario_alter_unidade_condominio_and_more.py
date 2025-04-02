# Generated by Django 5.1.6 on 2025-04-02 01:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imoveis', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='unidade',
            name='proprietario',
        ),
        migrations.AlterField(
            model_name='unidade',
            name='condominio',
            field=models.ForeignKey(help_text='unidade pertence a um condomínio específico.', on_delete=django.db.models.deletion.CASCADE, related_name='unidades', to='imoveis.condominio', verbose_name='Condomínio da qual a unidade faz parte'),
        ),
        migrations.DeleteModel(
            name='Inquilino',
        ),
        migrations.DeleteModel(
            name='Proprietario',
        ),
    ]

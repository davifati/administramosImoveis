# Generated by Django 5.2 on 2025-04-10 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imoveis', '0002_remove_administradora_quantidade_imoveis_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administradora',
            name='endereco',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Endereço'),
        ),
    ]

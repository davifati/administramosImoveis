# Generated by Django 5.1.6 on 2025-03-24 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operacional', '0010_remove_usuario_date_joined_usuario_entrada_em'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='password',
        ),
        migrations.AddField(
            model_name='usuario',
            name='senha',
            field=models.CharField(blank=True, max_length=128, null=True, verbose_name='Senha'),
        ),
    ]

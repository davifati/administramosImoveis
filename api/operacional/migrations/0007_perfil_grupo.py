# Generated by Django 5.1.6 on 2025-03-24 01:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('operacional', '0006_alter_cliente_cnpj_alter_usuario_cliente'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfil',
            name='grupo',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='perfil', to='auth.group'),
        ),
    ]

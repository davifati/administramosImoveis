import random
from rest_framework import serializers
from django.contrib.auth import get_user_model
from login.models.usuario import Perfil


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    perfil = serializers.PrimaryKeyRelatedField(
        queryset=Perfil.objects.all(),
        required=False,  # O perfil não é mais obrigatório
    )

    class Meta:
        model = get_user_model()  # Ou 'Usuario', se for o nome correto
        fields = ["email", "nome", "sobrenome", "password", "perfil"]

    def create(self, validated_data):

        nome = validated_data["nome"]
        sobrenome = validated_data["sobrenome"]
        email = validated_data["email"]
        username = f"{email}{sobrenome}{email}{''.join([str(random.randint(0, 9)) for _ in range(4)])}"

        user = get_user_model().objects.create_user(
            email=email,
            nome=nome,
            sobrenome=sobrenome,
            password=validated_data["password"],
            username=username,
        )
        return user

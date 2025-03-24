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
        # Verifica se o perfil foi enviado, senão usa o perfil padrão
        perfil = validated_data.get("perfil", Perfil.objects.get(nome="default"))

        user = get_user_model().objects.create_user(
            email=validated_data["email"],
            nome=validated_data["nome"],
            sobrenome=validated_data["sobrenome"],
            password=validated_data["password"],
            perfil=perfil,
        )
        return user

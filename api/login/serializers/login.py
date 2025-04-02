from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        User = get_user_model()

        # Verifica se o usuário existe
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("O e-mail fornecido não está registrado.")

        # Tenta autenticar o usuário
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                "E-mail ou senha incorretos. Verifique os dados e tente novamente."
            )

        return user

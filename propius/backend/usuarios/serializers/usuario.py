from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from usuarios.models.usuario import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["name"] = user.name
        return token

    def validate(self, attrs):
        attrs["username"] = attrs.get("email")  # simples ajuste pro JWT funcionar
        return super().validate(attrs)


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["email", "name", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

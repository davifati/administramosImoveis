from rest_framework import serializers
from .models import Boleto


class BoletoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Boleto
        fields = "__all__"


class FalhaSerializer(serializers.Serializer):
    data = serializers.DateField()
    motivo = serializers.CharField(max_length=255)


class ImobiliariaSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=255)
    site = serializers.URLField()
    unidade = serializers.CharField(max_length=255)
    dadosFalhas = FalhaSerializer(many=True)

from rest_framework_simplejwt.views import TokenObtainPairView
from usuarios.serializers import CustomTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

from usuarios.models.usuario import User
from usuarios.serializers import UserRegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

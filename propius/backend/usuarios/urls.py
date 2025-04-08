from django.urls import path
from usuarios.views.usuario import RegisterUserView
from usuarios.views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/atualizacao/", TokenRefreshView.as_view(), name="token_refresh"),
    path("cadastro/", RegisterUserView.as_view(), name="register"),
]

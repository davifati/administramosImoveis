from django.urls import include, path
from .views.login import LoginView
from .views.cadastro import RegisterView

urlpatterns = [
    path("entrar/", LoginView.as_view(), name="entrar"),
    path("cadastro/", RegisterView.as_view(), name="cadastro"),
]

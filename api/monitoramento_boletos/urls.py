from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"boletos", views.BoletoViewSet, basename="boletos")

urlpatterns = [
    path("", include(router.urls)),  # Incluir as URLs geradas pelo router
]

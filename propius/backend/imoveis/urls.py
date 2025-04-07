from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views.mockImoveis import ImoveisAPIView
from imoveis.views.ativos_locaticios import AtivosLocaticiosViewSet
from imoveis.views.administradora import AdministradoraViewSet
from imoveis.views.condominio import CondominioViewSet
from imoveis.views.unidade import UnidadeViewSet


router = DefaultRouter()

router.register(
    r"administradoras", AdministradoraViewSet, basename="ativos-administradoras"
)
router.register(r"condominios", CondominioViewSet, basename="ativos-condominios")
router.register(r"unidades", UnidadeViewSet, basename="ativos-unidades")
router.register(r"imoveis", AtivosLocaticiosViewSet, basename="ativos-locaticios")


urlpatterns = [
    path("", ImoveisAPIView.as_view()),
    path("locaticios/", include(router.urls)),
]

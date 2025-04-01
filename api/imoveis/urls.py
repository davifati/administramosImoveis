from django.urls import path
from .views import ImoveisAPIView

urlpatterns = [
    path("", ImoveisAPIView.as_view()),
]

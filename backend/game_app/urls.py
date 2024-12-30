from django.urls import path, register_converter
from .views import AllGames

urlpatterns = [
    path('', AllGames.as_view(), name='all_games'),
]

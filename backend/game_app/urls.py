from django.urls import path, register_converter
from .views import AllGames, SingleGame
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
  path('', AllGames.as_view(), name='all_games'),
  path('<int_or_str:game_identifier>/', SingleGame.as_view(), name='single_game'),
]

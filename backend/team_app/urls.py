from django.urls import path, register_converter
from .views import AllTeams, SingleTeam
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
  path('', AllTeams.as_view(), name='all_teams'),
  path('<int_or_str:team_identifier>/', SingleTeam.as_view(), name='single_team'),
]

from django.urls import path, register_converter
from .views import AllTeams

urlpatterns = [
    path('', AllTeams.as_view(), name='all_teams'),
]

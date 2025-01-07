from django.urls import path
from . import views

urlpatterns = [
    path('city/<str:city_name>/', views.CityPlacesView.as_view(), name='city_detail'),
    path('today_games/', views.GameTodayView.as_view(), name='games-by-date'),
    path('nfl_teams/', views.NFLTeamView.as_view(), name="nfl_teams"),
    path('team_standings/', views.NFLTeamStandings.as_view(), name='team_standings'),
    path('top_stats/', views.TopTenStats.as_view(), name='top_ten_stats_request'),
]

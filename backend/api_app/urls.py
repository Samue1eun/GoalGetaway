from django.urls import path
from . import views

urlpatterns = [
    path('city/<str:city_name>/', views.CityPlacesView.as_view(), name='city_detail'),
    path('today_games/', views.GameTodayView.as_view(), name='games-by-date'),
    path('nfl_teams/', views.NFLTeamView.as_view(), name="nfl_teams"),
    path('flight_data/', views.FlightScheduleView.as_view(), name="flight_data"),
    path('hotel_data/<str:cityCode>/', views.HotelView.as_view(), name="hotel_data"),
    path('hotel_details/<str:hotel_name>/', views.HotelDetailsView.as_view(), name='hotel_details'),
    path('flight_booking/<str:originLocationCode>/<str:destinationLocationCode>/<str:departureDate>/<int:adults>/', views.FlightBookingView.as_view(), name='flight_booking'),
]

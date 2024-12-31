from django.urls import path
from . import views

urlpatterns = [
    path('city/<str:city_name>/', views.CityPlacesView.as_view(), name='city_detail'),
]
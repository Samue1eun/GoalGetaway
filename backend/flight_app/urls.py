from django.urls import path, register_converter
from .views import AllFlights, SingleFlight
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllFlights.as_view(), name='all_flights'),
    path('<int_or_str:flight_identifier>/', SingleFlight.as_view(), name='single_flight'),
]

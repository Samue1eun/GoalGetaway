from django.urls import path, register_converter
from .views import AllTrips, SingleTrip
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllTrips.as_view(), name='all_trips'),
    path('<int_or_str:trips_identifier>/', SingleTrip.as_view(), name='single_trip'),
]

from django.urls import path, register_converter
from .views import AllLocations, SingleLocation
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllLocations.as_view(), name='all_locations'),
    path('<int_or_str:location_identifier>/', SingleLocation.as_view(), name='single_location')
]

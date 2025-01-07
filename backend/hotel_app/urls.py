from django.urls import path, register_converter
from .views import AllHotels, SingleHotel
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllHotels.as_view(), name='all_hotels'),
    path('<int_or_str:hotel_identifier>/', SingleHotel.as_view(), name='single_hotel'),
]

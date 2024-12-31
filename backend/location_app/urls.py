from django.urls import path, register_converter
from .views import AllLocations

urlpatterns = [
    path('', AllLocations.as_view(), name='all_locations'),
]

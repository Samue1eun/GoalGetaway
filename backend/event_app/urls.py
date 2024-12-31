from django.urls import path, register_converter
from .views import AllEvents

urlpatterns = [
    path('', AllEvents.as_view(), name='all_events'),
]

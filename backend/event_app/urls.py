from django.urls import path, register_converter
from .views import AllEvents, SingleEvent
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('', AllEvents.as_view(), name='all_events'),
    path('<int_or_str:event_identifier>/', SingleEvent.as_view(), name='single_event'),
]

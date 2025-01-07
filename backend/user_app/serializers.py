from.models import User
from rest_framework import serializers
from hotel_app.serializers import HotelSerializer
from flight_app.serializers import FlightSerializer
from event_app.serializers import EventSerializer

class UserSerializer(serializers.ModelSerializer):
    flights = FlightSerializer(many=True, read_only=True)
    hotels = HotelSerializer(many=True, read_only=True)
    events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = User
        #best practice
        fields = ['id', 'email', 'username', 'password', 'flights', 'hotels', 'events']
        extra_kwargs = {'password': {'write_only': True}}
        
        def get_flights(self, instance):
            flights = instance.flights.all().order_by('in_date')
            ser_flights = FlightSerializer(flights, many=True)
            return ser_flights.data
        
        def get_hotels(self, instance):
            hotels = instance.hotels.all().order_by('name')
            return HotelSerializer(hotels, many=True).data
        
        def get_events(self, instance):
            events = instance.events.all().order_by('name')
            ser_events = EventSerializer(events, many=True).data
            return 
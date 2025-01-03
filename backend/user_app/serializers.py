from.models import User
from rest_framework import serializers
from hotel_app.serializers import HotelSerializer
from flight_app.serializers import FlightSerializer
from event_app.serializers import EventSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #best practice
        fields = ['id', 'email', 'username', 'password', 'flights', 'hotels', 'events']
        extra_kwargs = {'password': {'write_only': True}}
        
        #fields = '__all__'
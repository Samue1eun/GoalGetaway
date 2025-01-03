from rest_framework import serializers
from .models import Flight

class FlightSerializer(serializers.ModelSerializer):
  class Meta:
    model = Flight
    fields = [ 
              'id', 
              'in_date', 
              'out_date', 
              'location_in', 
              'location_out',
            ]
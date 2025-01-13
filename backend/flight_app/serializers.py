from rest_framework import serializers
from .models import Flight

class FlightSerializer(serializers.ModelSerializer):
  class Meta:
    model = Flight
    fields = [ 
              "id", 
              "user",
              "in_date", 
              "out_date", 
              "location_in", 
              "location_out", 
              "connecting_in_date",
              "connecting_out_date",
              "connecting_location_in",
              "connecting_location_out",
            ]
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
        
    # Remove the "user" field from the serialized data
    representation.pop("user", None)  # Safely remove "user" if it exists
        
    return representation
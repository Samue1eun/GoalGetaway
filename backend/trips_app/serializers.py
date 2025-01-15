from rest_framework import serializers
from .models import Trips

class TripsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Trips
    fields = [ 
              "id", 
              "user",
              "name",
              "image_url",
              "price",
            ]
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
        
    # Remove the "user" field from the serialized data
    representation.pop("user", None)  # Safely remove "user" if it exists
        
    return representation
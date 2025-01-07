from rest_framework import serializers
from .models import Hotel

class HotelSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hotel
    fields = [
      'id',
      'user',
      'name',
      'check_in',
      'check_out',
      'location'
    ]
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
        
    # Remove the 'user' field from the serialized data
    representation.pop('user', None)  # Safely remove 'user' if it exists
        
    return representation
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = [ 
              'id', 
              'user',
              'name', 
              'date', 
              'location', 
              'game_of_the_day', 
              'description' 
            ]
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
        
    # Remove the 'user' field from the serialized data
    representation.pop('user', None)  # Safely remove 'user' if it exists
        
    return representation
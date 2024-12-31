from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Event
from .serializers import EventSerializer
# Create your views here.

class AllEvents(APIView):
    
  def get(self, request):
    return Response(EventSerializer(Event.objects.all().order_by('event_name'), many=True).data)
  
  def post(self, request):
    data = request.data.copy()
    
    new_event = EventSerializer(data=data)
    if new_event.is_valid():
      new_event.save()
      return Response(new_event.data, status=HTTP_201_CREATED)
    return Response(new_event.errors, status=HTTP_400_BAD_REQUEST)
  
class SingleEvent(APIView):
  
  def get_event(self, event_identifier):
    if type(event_identifier) == int:
      event = get_object_or_404(Event, id=event_identifier)
    elif type(event_identifier) == str:
      event = get_object_or_404(Event, event_name=event_identifier)#the str search is not working as intended with 
    return event                                                  #event_name but this can be modified after finalizing the models
        
            
  def get(self, request, event_identifier):
    return Response(EventSerializer(self.get_event(event_identifier)).data)
    
  def put(self, request, event_identifier):
    data = request.data.copy()
    updated_event = self.get_event(event_identifier)
        
    updated_event.event_name = data["event_name"]
        
    updated_event.save()
        
    return Response(EventSerializer(updated_event).data, status=HTTP_200_OK)
    
  def delete(self, request, event_identifier):
    event = self.get_event(event_identifier)
    event.delete()
    return Response(status=HTTP_204_NO_CONTENT)
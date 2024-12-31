from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Location
from .serializers import LocationSerializer

# Create your views here.
class AllLocations(APIView):
    
  def get(self, request):
    return Response(LocationSerializer(Location.objects.all().order_by('location_name'), many =True).data)
  
  def post(self, request):
    data = request.data.copy()
    
    new_location = locationSerializer(data=data)
    if new_location.is_valid():
      new_location.save()
      return Response(new_location.data, status=HTTP_201_CREATED)
    return Response(new_location.errors, status=HTTP_400_BAD_REQUEST)
  
class SingleLocation(APIView):
  
  def get_location(self, location_identifier):
    if type(location_identifier) == int:
      location = get_object_or_404(location, id=location_identifier)
    elif type(location_identifier) == str:
      location = get_object_or_404(location, location_name=location_identifier)#the str search is not working as intended with 
    return location                                                            #location_name but this can be modified after finalizing the models
        
            
  def get(self, request, location_identifier):
    return Response(LocationSerializer(self.get_location(location_identifier)).data)
    
  def put(self, request, location_identifier):
    data = request.data.copy()
    updated_location = self.get_location(location_identifier)
        
    updated_location.location_name = data["location_name"]
        
    updated_location.save()
        
    return Response(LocationSerializer(updated_location).data, status=HTTP_200_OK)
    
  def delete(self, request, location_identifier):
    location = self.get_location(location_identifier)
    location.delete()
    return Response(status=HTTP_204_NO_CONTENT)  
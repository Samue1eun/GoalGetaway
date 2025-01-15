from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Trips
from .serializers import TripsSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class AllTrips(APIView):
  permission_classes = [IsAuthenticated]
    
  def get(self, request):
    return Response(TripsSerializer(Trips.objects.all(), many=True).data)
  
  def post(self, request):
    data = request.data.copy()
    
    data['user'] = request.user.id 

    new_trips = TripsSerializer(data=data)
    
    if new_trips.is_valid():
      new_trips.save()
      return Response(new_trips.data, status=HTTP_201_CREATED)
    return Response(new_trips.errors, status=HTTP_400_BAD_REQUEST)
  
class SingleTrip(APIView):
  
  def get_trips(self, trips_identifier):
    if type(trips_identifier) == int:
      trips = get_object_or_404(Trips, id=trips_identifier)
    elif type(trips_identifier) == str:
      trips = get_object_or_404(Trips, name=trips_identifier)
    return trips 
        
            
  def get(self, request, trips_identifier):
    return Response(TripsSerializer(self.get_trips(trips_identifier)).data)
    
  def put(self, request, trips_identifier):
    data = request.data.copy()
    updated_trips = self.get_trips(trips_identifier)
        
    updated_trips.name = data["name"]
    updated_trips.image_url = data["image_url"]
    updated_trips.price = data["price"]
        
    updated_trips.save()
        
    return Response(TripsSerializer(updated_trips).data, status=HTTP_200_OK)
    
  def delete(self, request, trips_identifier):
    trips = self.get_trips(trips_identifier)
    trips.delete()
    return Response(status=HTTP_204_NO_CONTENT)
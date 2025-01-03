from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Flight
from .serializers import FlightSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class AllFlights(APIView):
  permission_classes = [IsAuthenticated]
    
  def get(self, request):
    return Response(FlightSerializer(Flight.objects.all().order_by('in_date'), many=True).data)
  
  def post(self, request):
    data = request.data.copy()
    
    new_flight = FlightSerializer(data=data)
    
    if new_flight.is_valid():
      new_flight.save()
      return Response(new_flight.data, status=HTTP_201_CREATED)
    return Response(new_flight.errors, status=HTTP_400_BAD_REQUEST)
  
class SingleFlight(APIView):
  
  def get_flight(self, flight_identifier):
    if type(flight_identifier) == int:
      flight = get_object_or_404(Flight, id=flight_identifier)
    elif type(flight_identifier) == str:
      flight = get_object_or_404(Flight, name=flight_identifier)
    return flight 
        
            
  def get(self, request, flight_identifier):
    return Response(FlightSerializer(self.get_flight(flight_identifier)).data)
    
  def put(self, request, flight_identifier):
    data = request.data.copy()
    updated_flight = self.get_flight(flight_identifier)
        
    updated_flight.in_date = data["in_date"]
    updated_flight.out_date = data["out_date"]
    updated_flight.location_in = data["location_in"]
    updated_flight.location_out = data["location_out"]
        
    updated_flight.save()
        
    return Response(FlightSerializer(updated_flight).data, status=HTTP_200_OK)
    
  def delete(self, request, flight_identifier):
    flight = self.get_flight(flight_identifier)
    flight.delete()
    return Response(status=HTTP_204_NO_CONTENT)
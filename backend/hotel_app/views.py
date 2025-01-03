from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Hotel
from .serializers import HotelSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class AllHotels(APIView):
  permission_classes = [IsAuthenticated]
    
  def get(self, request):
    return Response(HotelSerializer(Hotel.objects.all().order_by('name'), many=True).data)
  
  def post(self, request):
    data = request.data.copy()
    
    new_hotel = HotelSerializer(data=data)
    
    if new_hotel.is_valid():
      new_hotel.save()
      return Response(new_hotel.data, status=HTTP_201_CREATED)
    return Response(new_hotel.errors, status=HTTP_400_BAD_REQUEST)
  
class SingleHotel(APIView):
  
  
  def get_hotel(self, hotel_identifier):
    if type(hotel_identifier) == int:
      hotel = get_object_or_404(Hotel, id=hotel_identifier)
    elif type(hotel_identifier) == str:
      hotel = get_object_or_404(Hotel, name=hotel_identifier)
    return hotel 
        
            
  def get(self, request, hotel_identifier):
    return Response(HotelSerializer(self.get_hotel(hotel_identifier)).data)
    
  def put(self, request, hotel_identifier):
    data = request.data.copy()
    updated_hotel = self.get_hotel(hotel_identifier)
        
    updated_hotel.name = data["name"]
    updated_hotel.check_in = data["check_in"]
    updated_hotel.check_out = data["check_out"]
    updated_hotel.location = data["location"]
        
    updated_hotel.save()
        
    return Response(HotelSerializer(updated_hotel).data, status=HTTP_200_OK)
    
  def delete(self, request, hotel_identifier):
    hotel = self.get_hotel(hotel_identifier)
    hotel.delete()
    return Response(status=HTTP_204_NO_CONTENT)
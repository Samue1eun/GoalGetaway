from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Location
from .serializers import LocationSerializer

# Create your views here.
class AllLocations(APIView):
    
    def get(self, request):
      return Response(LocationSerializer(Location.objects.all().order_by('location_name'), many =True).data)
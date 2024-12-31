from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
# Create your views here.

class AllEvents(APIView):
    
    def get(self, request):
        return Response(EventSerializer(Event.objects.all().order_by('event_name'), many=True).data)
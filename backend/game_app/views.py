from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

# Create your views here.
class AllGames(APIView):
    
    def get(self, request):
        return Response(GameSerializer(Game.objects.all().order_by('name'), many=True).data)
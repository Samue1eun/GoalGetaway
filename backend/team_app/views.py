from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Team
from .serializers import TeamSerializer

# Create your views here.
class AllTeams(APIView):
  
  def get(self, request):
    return Response(TeamSerializer(Team.objects.all().order_by('team_name'), many=True).data)
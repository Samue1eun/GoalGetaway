from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Team
from .serializers import TeamSerializer

# Create your views here.
class AllTeams(APIView):
  
  def get(self, request):
    return Response(TeamSerializer(Team.objects.all().order_by('team_name'), many=True).data)
  
  def post(self, request):
    data = request.data.copy()
        
    new_team = TeamSerializer(data=data)
    if new_team.is_valid():
      new_team.save()
      return Response(new_team.data, status=HTTP_201_CREATED)
    return Response(new_team.errors, status=HTTP_400_BAD_REQUEST)
    
class SingleTeam(APIView):
    
  def get_team(self, team_identifier):
    if type(team_identifier) == int:
      team = get_object_or_404(Team, id=team_identifier)
    elif type(team_identifier) == str:
      team = get_object_or_404(Team, team_name=team_identifier)#the str search is not working as intended with 
    return team                                                #team_name but this can be modified after finalizing the models
        
            
  def get(self, request, team_identifier):
    return Response(TeamSerializer(self.get_team(team_identifier)).data)
    
  def put(self, request, team_identifier):
    data = request.data.copy()
    updated_team = self.get_team(team_identifier)
        
    updated_team.team_name = data["team_name"]
        
    updated_team.save()
        
    return Response(TeamSerializer(updated_team).data, status=HTTP_200_OK)
    
  def delete(self, request, team_identifier):
    team = self.get_team(team_identifier)
    team.delete()
    return Response(status=HTTP_204_NO_CONTENT)
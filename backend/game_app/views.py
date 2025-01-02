from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from .models import Game
from .serializers import GameSerializer

# Create your views here.
class AllGames(APIView):
    
  def get(self, request):
    return Response(GameSerializer(Game.objects.all().order_by('game_name'), many=True).data)
    
  def post(self, request):
    data = request.data.copy()
        
    new_game = GameSerializer(data=data)
    if new_game.is_valid():
      new_game.save()
      return Response(new_game.data, status=HTTP_201_CREATED)
    return Response(new_game.errors, status=HTTP_400_BAD_REQUEST)
    
class SingleGame(APIView):
    
  def get_game(self, game_identifier):
    if type(game_identifier) == int:
      game = get_object_or_404(Game, id=game_identifier)
    elif type(game_identifier) == str:
      game = get_object_or_404(Game, game_name=game_identifier)#the str search is not working as intended with 
    return game                                                #game_name but this can be modified after finalizing the models
        
            
  def get(self, request, game_identifier):
    return Response(GameSerializer(self.get_game(game_identifier)).data)
    
  def put(self, request, game_identifier):
    data = request.data.copy()
    updated_game = self.get_game(game_identifier)
        
    updated_game.game_name = data["game_name"]
        
    updated_game.save()
        
    return Response(GameSerializer(updated_game).data, status=HTTP_200_OK)
    
  def delete(self, request, game_identifier):
    game = self.get_game(game_identifier)
    game.delete()
    return Response(status=HTTP_204_NO_CONTENT)
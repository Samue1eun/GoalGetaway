from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token


class TokenReq(APIView):
    authentication_classes= [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class SignUp(APIView):
    
    def post(self, request):
        data = request.data.copy()
        
        data["username"] = request.data["email"]
        new_user = User.objects.create_user(**data)
        token = Token.objects.create(user=new_user)
        return Response({
            'token': token.key, 
            'email' : new_user.email,  
            'display_name': new_user.display_name, 
            'id': new_user.id
            }, 
            status=HTTP_201_CREATED
        )
    
class LogIn(APIView):
    
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        current_user = authenticate(username=email, password=password)
        if current_user:
            token, created = Token.objects.get_or_create(user=current_user)
            return Response({
                "token" : token.key, 
                "email": current_user.email, 
                "display_name" : current_user.display_name, 
                'id': current_user.id
            })
        else:
            return Response("None of our clients match those credentials.", status=HTTP_400_BAD_REQUEST)
        
class Info(TokenReq):
    
    def get(self, request):
        return Response(UserSerializer(User.objects.get(id=request.user.id)).data)
    
class LogOut(TokenReq):
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=HTTP_200_OK)
        except Exception:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class Info(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=HTTP_200_OK)

class FavoriteTeam(TokenReq):
    def post(self, request):
        user = request.user
        user.favorite_team_name = request.data["favorite_team_name"]
        user.favorite_team_alias = request.data["favorite_team_alias"]
        user.save()
        return Response({
            "favorite_team_name": user.favorite_team_name,
            "favorite_team_alias": user.favorite_team_alias
        }, status=HTTP_200_OK)
    
    def get(self, request):
        user = request.user
        return Response({
            "favorite_team_name": user.favorite_team_name,
            "favorite_team_alias": user.favorite_team_alias
        }, status=HTTP_200_OK)

    def put(self, request):
        user = request.user
        user.favorite_team_name = request.data["favorite_team_name"]
        user.favorite_team_alias = request.data["favorite_team_alias"]
        user.save()
        return Response({
            "favorite_team_name": user.favorite_team_name,
            "favorite_team_alias": user.favorite_team_alias
        }, status=HTTP_200_OK)
    
    def delete(self, request):
        user = request.user
        user.favorite_team_name = None
        user.favorite_team_alias = None
        user.save()
        return Response(status=HTTP_204_NO_CONTENT)
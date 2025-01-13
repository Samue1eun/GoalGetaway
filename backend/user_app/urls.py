from django.urls import path
from .views import SignUp, LogIn, LogOut, Info, FavoriteTeam

urlpatterns = [
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', LogIn.as_view(), name='login'),
    path('logout/', LogOut.as_view(), name='logout'),
    path('info/', Info.as_view(), name='info'),
    path('favorite_team/', FavoriteTeam.as_view(), name='favorite_team')
]
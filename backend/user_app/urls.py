from django.urls import path
from .views import SignUp, LogIn, LogOut, Info
from .views import AddFavoriteTeam

urlpatterns = [
    path('signup/',SignUp.as_view(), name='signup'),
    path('login/',LogIn.as_view(), name='login'),
    path('logout/',LogOut.as_view(), name='logout'),
    path('info',Info.as_view(), name='info'),
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', LogIn.as_view(), name='login'),
    path('logout/', LogOut.as_view(), name='logout'),
    path('info/', Info.as_view(), name='info'),
    path('add_favorite_team/', AddFavoriteTeam.as_view(), name='add_favorite_team'),
]
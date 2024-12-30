from django.urls import path
from .views import sign_up, log_in, log_out

urlpatterns = [
    path('signup/',sign_up.as_view(), name='signup'),
    path('login/',log_in.as_view(), name='login'),
    path('logout/',log_out.as_view(), name='logout')
]
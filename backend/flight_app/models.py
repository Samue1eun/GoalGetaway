from django.db import models
from datetime import date
from user_app.models import User
# Create your models here.
class Flight(models.Model):
  in_date = models.DateField(blank=False)
  out_date = models.DateField(blank=False)
  location_in = models.CharField(max_length=255, blank=False)
  location_out = models.CharField(max_length=255, blank=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='flights')
  # connection_detail ---> maybe added later depending on what 
  #                        can be taken from the third party apis
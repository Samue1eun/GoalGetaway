from django.db import models
from datetime import date
from user_app.models import User
# Create your models here.
class Hotel(models.Model):
  name = models.CharField(max_length=155, blank=False)
  check_in = models.DateField(blank=False)
  check_out = models.DateField(blank=False)
  location = models.CharField(max_length=255, blank=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hotels')
from django.db import models
from datetime import date
# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=155, unique=True, blank=False)
    date = models.DateField(default=date.today, blank=False)
    location = models.CharField(max_length=255, blank=False)
    game_of_the_day = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=True)
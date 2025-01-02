from django.db import models

# Create your models here.
class Location(models.Model):
    location_name = models.CharField(max_length=155, unique=True)
    # events = models.ForeignKey()
    
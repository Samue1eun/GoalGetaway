from django.db import models

# Create your models here.
class Team(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=155, unique=True)
    city = models.CharField(max_length=155)
    abbreviation = models.CharField(max_length=3, unique=True)
    logo_url = models.URLField(max_length=200, blank=True, null=True)
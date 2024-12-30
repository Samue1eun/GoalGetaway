from django.db import models
from datetime import date
# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=155, unique=True)
    game_date = models.DateField(default=date.today)
    location = models.CharField(blank=False)
    # team_one = 
    # team_two = 
    # these two have not been created yet, they should be made as foreign key fields. 
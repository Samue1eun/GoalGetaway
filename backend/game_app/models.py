from django.db import models
from datetime import date
# Create your models here.
class Game(models.Model):
    game_name = models.CharField(max_length=155, unique=True)
    game_date = models.DateField(default=date.today)
    # location = models.ForeignKey()
    # team_one = models.ForeignKey()
    # team_two = models.ForeignKey()
    # these have not been created yet, they should be made as foreign key fields. 
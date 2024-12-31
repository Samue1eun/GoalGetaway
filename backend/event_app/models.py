from django.db import models
from datetime import date
# Create your models here.
class Event(models.Model):
    event_name = models.CharField(max_length=155, unique=True)
    event_date = models.DateField(default=date.today)
    # location = models.ForeignKey()
    # game = models.ForeignKey()
    # these have not been created yet, they should be made as foreign key fields. 
from django.db import models
from user_app.models import User
# Create your models here.
class Trips(models.Model):
  name = models.CharField(max_length=255, blank=False)
  image_url = models.TextField( blank=False)
  price = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
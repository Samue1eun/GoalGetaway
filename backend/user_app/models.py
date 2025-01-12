from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from .validators import validate_email, validate_password

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(verbose_name='email address', unique=True, validators=[validate_email])
    password = models.CharField(max_length=128, validators=[validate_password, v.MinLengthValidator(8)])
    display_name = models.CharField(max_length=128)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
class Team(models.Model):
    team_id = models.AutoField(primary_key=True)
    team_name = models.CharField(max_length=128)
    city = models.CharField(max_length=128)
    abbreviation = models.CharField(max_length=3, unique=True)
    logo_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"{self.city} {self.team_name}"
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as valid
from .validators import validate_email

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(verbose_name='email address', unique=True, validators=[validate_email])
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):  # here we've used AbstractUser so that we can extend the user model
    username = models.EmailField(unique=True)
    city = models.CharField(max_length=40)
    state = models.CharField(max_length=45)
    twitter = models.BooleanField(default=False)

    def __str__(self):
        return self.username

from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

class UserData(models.Model):

    """
    Model to represent saved player data and profile information.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nationality = CountryField(blank_label="(select country)", blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.nationality})"
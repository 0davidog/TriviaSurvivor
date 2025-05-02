from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

class UserData(models.Model):

    """
    Model to represent saved player data and profile information.
    """
    icon_choices = [
        ('01', 'icon01'),
        ('02', 'icon02'),
        ('03', 'icon03'),
        ('04', 'icon04'),
        ('05', 'icon05'),
        ('06', 'icon06'),
        ('07', 'icon07')]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(null=True)
    player_icon = models.CharField(choices=icon_choices, default='04')
    nationality = CountryField(blank_label="(select country)", blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.nationality})"
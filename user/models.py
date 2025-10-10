from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from cloudinary.models import CloudinaryField

# Create your models here.

class UserIcon(models.Model):
    icon_name = models.CharField()
    icon = CloudinaryField('image')
    public = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.id}: {self.icon_name}"

class UserData(models.Model):

    """
    Model to represent saved player data and profile information.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nationality = CountryField(blank_label="(select country)", blank=True)
    user_icon = models.ForeignKey(UserIcon, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.user.username} ({self.nationality})"
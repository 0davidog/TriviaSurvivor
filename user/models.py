from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField
from cloudinary.models import CloudinaryField
from data.models import Film
# Create your models here.

class UserIcon(models.Model):
    """
    Model to represent the user icons available.
    Upload and storage via Cloudinary
    Requires: 'from cloudinary.models import CloudinaryField'
    """
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
    fav_1 = models.ForeignKey(Film, null=True, blank=True, on_delete=models.SET_NULL, related_name="favourite_1")
    fav_2 = models.ForeignKey(Film, null=True, blank=True, on_delete=models.SET_NULL, related_name="favourite_2")
    fav_3 = models.ForeignKey(Film, null=True, blank=True, on_delete=models.SET_NULL, related_name="favourite_3")
    fav_4 = models.ForeignKey(Film, null=True, blank=True, on_delete=models.SET_NULL, related_name="favourite_4")
    fav_5 = models.ForeignKey(Film, null=True, blank=True, on_delete=models.SET_NULL, related_name="favourite_5")

    def __str__(self):
        return f"{self.user.username} ({self.nationality})"
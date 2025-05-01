from django.db import models
from django_countries.fields import CountryField

# Create your models here.

class Genre(models.Model):

    """
    Model to represent the different game modes the user will select.
    """

    genre_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.genre_name}"
    

class Film(models.Model):

    """
    Model to represent additional information on films referenced in game questions.
    """

    title = models.CharField(max_length=250)
    year = models.IntegerField(blank=True)
    director = models.CharField(blank=True)
    origin = CountryField(blank_label="(select country)")
    studio = models.CharField(blank=True)
    genre = models.ForeignKey(Genre, blank=True, null=True, on_delete=models.SET_NULL)
    imdb = models.URLField(blank=True)

    def __str__(self):
        """
        Film reference.
        """
        return f"{self.title}{{% if self.year %}}&nbsp;({self.year}){{% endif %}}. Directed by {self.director}. {self.origin}: {self.studio}"
    

class Question(models.Model):

    """
    Model to represent each question to be used in the game.
    """

    answer_choice = [('A', 'A'), ('B', 'B'), ('C,', 'C')]

    genre = models.ForeignKey(Genre, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.CharField()
    option_a = models.CharField()
    option_b = models.CharField()
    option_c = models.CharField()
    answer = models.CharField(choices=answer_choice)
    film = models.ForeignKey(Film, blank=True, null=True, on_delete=models.SET_NULL)
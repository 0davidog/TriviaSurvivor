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
    genre = models.ForeignKey(Genre, blank=True, null=True, on_delete=models.SET_NULL)
    imdb = models.URLField(blank=True)

    def __str__(self):
        """
        Film reference.
        """
        return f"{self.genre}: {self.title} ({self.year}). Directed by {self.director}. {self.origin}"
    

class Question(models.Model):

    """
    Model to represent each question to be used in the game.
    """

    genre = models.ForeignKey(Genre, blank=True, null=True, on_delete=models.SET_NULL)
    question = models.TextField()
    option_a = models.ForeignKey(Film, blank=True, null=True, on_delete=models.SET_NULL, related_name="option_a")
    option_b = models.ForeignKey(Film, blank=True, null=True, on_delete=models.SET_NULL, related_name="option_b")
    option_c = models.ForeignKey(Film, blank=True, null=True, on_delete=models.SET_NULL, related_name="option_c")
    answer = models.ForeignKey(Film, blank=True, null=True, on_delete=models.SET_NULL, related_name="answer")

    def __str__(self):
        """
        Question Layout
        """
        return f"Q{self.pk}: {self.genre} - {self.question}"
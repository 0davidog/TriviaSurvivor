from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

class Genre(models.Model):

    """
    Model to represent the different game modes the user will select.
    """

    genre_name = models.CharField(max_length=100, unique=True)
    creature_name = models.CharField(max_length=100, blank=True)
    death_name = models.CharField(max_length=100, blank=True)

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
        return f"{self.title} ({self.year}). Directed by {self.director}. {self.origin} | {self.genre}"
    

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
    is_flagged = models.BooleanField(default=False)

    def __str__(self):
        """
        Question Layout
        """
        return f"Q{self.pk}: {self.genre} - {self.question}"
    

class Flag(models.Model):

    """
    Model to represent reason for flagged question
    """

    question = models.ForeignKey(Question, blank=True, null=True, on_delete=models.CASCADE)
    comment = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="author")
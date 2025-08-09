from django import forms
from data.models import Film, Question, Genre

class FilmForm(forms.ModelForm):

    class Meta:

        model = Film

        fields = {
            'title',
            'year',
            'director',
            'origin',
            'genre',
            'imdb',
        }


class QuestionForm(forms.ModelForm):

    class Meta:

        model = Question

        fields = {
            'question',
            'option_a',
            'option_b',
            'option_c',
            'answer',
        }


class GenreForm(forms.ModelForm):

    class Meta:

        model = Genre

        fields = {
            'genre_name',
            'creature_name',
        }
from django import forms
from data.models import Film, Question

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
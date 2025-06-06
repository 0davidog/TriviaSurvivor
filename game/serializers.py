from rest_framework import serializers
from data.models import Question, Film

class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['id', 'title', 'year', 'director', 'origin',]

class QuestionSerializer(serializers.ModelSerializer):

    option_a = FilmSerializer()
    option_b = FilmSerializer()
    option_c = FilmSerializer()
    answer = FilmSerializer()

    class Meta:
        model = Question
        fields = [
            'id',
            'genre',
            'question',
            'option_a',
            'option_b',
            'option_c',
            'answer',
        ]
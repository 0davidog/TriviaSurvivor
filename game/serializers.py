from rest_framework import serializers
from data.models import Question, Film, Genre, Flag, GameResult

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


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = [
            'genre_name', 
            'killer_name', 
            'death_name',
            ]
        

class FlagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flag
        fields = "__all__"


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = GameResult
        fields = "__all__"
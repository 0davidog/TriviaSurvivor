from django.shortcuts import render, get_object_or_404
from django.db.models import Count, Avg, Q
from django.contrib.auth.models import User
from .models import Genre, Film

# Create your views here.
def survivors(request):

    users = User.objects.annotate(
        games_played=Count('games'),
        games_won=Count('games', filter=Q(games__survived=True)),
        games_lost=Count('games', filter=Q(games__survived=False)),
        avg_score=Avg('games__score'),
    ).filter(games_played__gt=0).order_by('-avg_score')

    context = {
        'users': users,
    }

    return render(request, 'data/survivors.html', context)


def genres(request):

    genres = Genre.objects.all()

    context = {
        'genres': genres
    }

    return render(request, 'data/genres.html', context)


def films(request, genre):

    films = Film.objects.filter(genre=genre).order_by("year")
    genre_name = get_object_or_404(Genre, id=genre)
    context = {
        'films': films,
        'genre': genre_name,
    }

    return render(request, 'data/films.html', context)

def film_detail(request, genre, film):

    film = get_object_or_404(Film, id=film)

    context = {
        "film": film
    }

    return render(request, 'data/film_detail.html', context)
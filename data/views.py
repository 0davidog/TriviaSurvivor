from django.shortcuts import render
from django.db.models import Count, Avg, Q
from django.contrib.auth.models import User

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
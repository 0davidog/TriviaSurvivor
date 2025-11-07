from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import user_passes_test, login_required
from django.contrib import messages
from django.db.models import Count, Avg, Q
from django.contrib.auth.models import User
from .models import UserData, UserIcon
from .forms import UserForm, UserDataForm
from data.models import GameResult

# Create your views here.


def view_profile(request, player):
    
    player = get_object_or_404(User, username=player)
    
    user_data = get_object_or_404(UserData, user=player.id)

    # Aggregate the user's game stats
    stats = GameResult.objects.filter(user=player).aggregate(
        games_played=Count('id'),
        games_won=Count('id', filter=Q(survived=True)),
        games_lost=Count('id', filter=Q(survived=False)),
        avg_score=Avg('score'),
    )

        # Determine most played genre
    most_played = (
        GameResult.objects.filter(user=player.id)
        .values('genre__genre_name')
        .annotate(count=Count('id'))
        .order_by('-count')
        .first()
    )

    most_played_genre = most_played['genre__genre_name'] if most_played else None

    context = {
        'user_data': user_data,
        'stats': stats,
        'player': player,
        'most_played_genre': most_played_genre,
    }

    return render(request, 'user/view_profile.html', context)


@user_passes_test(lambda u: u.is_authenticated)
def change_icon(request):

    user_data = get_object_or_404(UserData, user=request.user)
    if (request.user.is_superuser):
        icons = UserIcon.objects.all()
    else:
        icons = UserIcon.objects.filter(public=True)

    context = {
        'icons': icons,
        'user_data': user_data,
    }

    return render(request, 'user/change_icon.html', context)

@login_required
def set_icon(request):
    if request.method == "POST":
        icon_id = request.POST.get("user_icon")
        if icon_id:
            icon = UserIcon.objects.get(id=icon_id)
            user_data = UserData.objects.get(user=request.user)
            user_data.user_icon = icon
            user_data.save()
        return redirect("view_profile", request.user)
    

@login_required
def edit_profile(request):

    user_info = get_object_or_404(UserData, user=request.user)
    data_form = None

    if request.method == 'POST':
        user_data_form = UserDataForm(data=request.POST, instance=user_info)
        if user_data_form.is_valid():
            user_info = user_data_form.save(commit=False)
            user_info.save()
            messages.add_message(
                request, messages.SUCCESS,
                f"User profile edit saved."
                )
            data_form = UserDataForm(instance=user_info)
            return redirect("view_profile", request.user)
    else:
        data_form = UserDataForm(instance=user_info)

    context = {
            'data_form': data_form,
            }
            
        
    return render(request, 'user/edit_profile.html', context)
    


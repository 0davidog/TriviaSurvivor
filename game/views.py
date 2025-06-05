from django.shortcuts import render, get_object_or_404
from user.models import UserData

def index(request):
    """
    A view to return the index page.
    """

    user_data = None
    icon_url = None

    if request.user.is_authenticated:
        try:
            user_data = UserData.objects.get(user=request.user)
            icon_url = f"images/player_icons/icon{user_data.player_icon}.png"
        except UserData.DoesNotExist:
            user_data = None
            icon_url = None

    context = {
        'user_data': user_data,
        'icon_url': icon_url,
    }

    return render(request, 'game/index.html', context)
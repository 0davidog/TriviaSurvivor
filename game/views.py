from django.shortcuts import render, get_object_or_404
from user.models import UserData

# Create your views here.

def index(request):
    """
    A view to return the index page.
    """

    user_data = get_object_or_404(UserData, user=request.user)

    icon_url = f"images/player_icons/icon{user_data.player_icon}.png"

    context = {
        'user_data' : user_data,
        'icon_url' : icon_url,
    }
    
    # Render the index page with the provided context
    return render(request, 'game/index.html', context)
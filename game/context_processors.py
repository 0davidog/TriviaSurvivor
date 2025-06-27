from user.models import UserData

def user_data_context(request):
    if request.user.is_authenticated:
        try:
            user_data = UserData.objects.get(user=request.user)
            icon_url = f"images/player_icons/icon{user_data.player_icon}.png"
        except UserData.DoesNotExist:
            user_data = None
            icon_url = None
    else:
        user_data = None
        icon_url = None

    return {
        'user_data': user_data,
        'icon_url': icon_url,
    }
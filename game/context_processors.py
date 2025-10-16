from django.shortcuts import get_object_or_404
from user.models import UserData, UserIcon

def user_data_context(request):

    if request.user.is_authenticated:
        try:
            user_data = UserData.objects.get(user=request.user)
        except UserData.DoesNotExist:
            user_data = None
    else:
        user_data = None

    default_icon = get_object_or_404(UserIcon, id=4)

    return {
        'user_data': user_data,
        'default_icon': default_icon,
    }
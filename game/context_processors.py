from user.models import UserData

def user_data_context(request):
    if request.user.is_authenticated:
        try:
            user_data = UserData.objects.get(user=request.user)
        except UserData.DoesNotExist:
            user_data = None
    else:
        user_data = None

    return {
        'user_data': user_data,
    }
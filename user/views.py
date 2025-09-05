from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import user_passes_test
from .models import UserData

# Create your views here.

@user_passes_test(lambda u: u.is_authenticated)
def view_profile(request):

    user_data = get_object_or_404(UserData, user=request.user)

    context = {
        'user_data': user_data,
    }

    return render(request, 'user/view_profile.html', context)
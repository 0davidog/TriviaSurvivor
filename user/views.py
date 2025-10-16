from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import user_passes_test, login_required
from .models import UserData, UserIcon

# Create your views here.

@user_passes_test(lambda u: u.is_authenticated)
def view_profile(request):

    user_data = get_object_or_404(UserData, user=request.user)

    context = {
        'user_data': user_data,
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
        return redirect("view_profile")
    


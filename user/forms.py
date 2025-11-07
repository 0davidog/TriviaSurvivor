from django import forms
from django.contrib.auth.models import User
from .models import UserData

class UserDataForm(forms.ModelForm):

    class Meta:
        model = UserData

        fields = [
            'nationality',
            'fav_1',
            'fav_2',
            'fav_3',
            'fav_4',
            'fav_5',
        ]


class UserForm(forms.ModelForm):

    class Meta:
        model = User

        fields = [
            'username',
        ]
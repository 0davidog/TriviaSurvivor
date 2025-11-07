from django.contrib import admin
from .models import UserData, UserIcon

# Register your models here.


admin.site.register(UserIcon)

@admin.register(UserData)
class QuestionAdmin(admin.ModelAdmin):
    autocomplete_fields = ['fav_1', 'fav_2', 'fav_3', 'fav_4', 'fav_5']
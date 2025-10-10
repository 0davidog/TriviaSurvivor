from django.contrib import admin
from.models import Genre, Film, Question, Flag, GameResult

# Register your models here.

admin.site.register(Genre)
admin.site.register(Film)
admin.site.register(Question)
admin.site.register(Flag)
admin.site.register(GameResult)
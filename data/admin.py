from django.contrib import admin
from.models import Genre, Film, Question, Flag, GameResult

# Register your models here.

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ['genre_name']
    ordering = ['chapter_number']
@admin.register(Film)
class FilmAdmin(admin.ModelAdmin):
    search_fields = ['title', 'director']
    list_display = ['title', 'year', 'director', 'origin', 'genre']
    list_filter = ['genre', 'director']
    ordering = ['year']
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    autocomplete_fields = ['option_a', 'option_b', 'option_c', 'answer', 'genre']
    list_display = ['question', 'answer']
    list_filter = ['genre', 'answer']

admin.site.register(Flag)

admin.site.register(GameResult)
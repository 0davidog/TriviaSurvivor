from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import user_passes_test
from django.contrib import messages
from django.db.models import Q
from data.models import Film, Genre, Question
from .forms import FilmForm, QuestionForm

# Create your views here.
@user_passes_test(lambda u: u.is_staff)
def workshed(request):

    return render(request, 'workshed/index.html')


@user_passes_test(lambda u: u.is_staff)
def film_list(request):

    films = Film.objects.all()
    genres = Genre.objects.all()
    genre_chosen = 'Genre'

    if request.GET:
        if 'genre' in request.GET:

            genre_query = request.GET['genre']
            genre_chosen = get_object_or_404(Genre, id=genre_query)

            films = films.filter(
                    genre=genre_query
                    )
            
        if 's-q' in request.GET:
            search_query = request.GET['s-q']

            # If no search query is provided, display an error message
            if not search_query:
                messages.error(request, "Search criteria needed!")

            # Define queries
            # to search for the provided search query

            queries = Q(title__icontains=search_query) | Q(director__icontains=search_query) | Q(origin__icontains=search_query) | Q(year__icontains=search_query)
            # Filter videos based on search queries
            films = films.filter(queries)

    context = {
        'films': films,
        'genres': genres,
        'genre_chosen': genre_chosen,
    }
    return render(request, 'workshed/film_list.html', context)


@user_passes_test(lambda u: u.is_staff)
def film_detail(request, id):

    film = get_object_or_404(Film, id=id)
    
    form = None

    if request.method == 'POST':
        film_form = FilmForm(data=request.POST)
        if film_form.is_valid():
            film = film_form.save(commit=False)
            film.save()
            messages.add_message(
                request, messages.SUCCESS,
                f"Film data edit successful"
                )
            form = FilmForm(instance=film)
    else:
        form = FilmForm(instance=film)

    context = {
        'film': film,
        'form': form,
    }

    return render(request, 'workshed/film_detail.html', context)


@user_passes_test(lambda u: u.is_staff)
def new_film(request):

    film = None

    if request.method == 'POST':
        form = FilmForm(data=request.POST)
        if form.is_valid():
            film = form.save(commit=False)
            film.save()
            messages.add_message(request, messages.SUCCESS, f"Film added successfully")
            return HttpResponseRedirect(reverse('films'))
    else:

        form = FilmForm()
    
    context = {
        'form': form,
        'film': film,
    }

    return render(request, 'workshed/new_film.html', context)


@user_passes_test(lambda u: u.is_staff)
def question_list(request):
    questions = Question.objects.all()
    films = Film.objects.all()
    genres = Genre.objects.all()
    genre_chosen = 'Genre'

    if request.GET:
        if 'genre' in request.GET:

            genre_query = request.GET['genre']
            genre_chosen = get_object_or_404(Genre, id=genre_query)

            questions = questions.filter(
                    genre=genre_query
                    )
            
        if 's-q' in request.GET:
            search_query = request.GET['s-q']

            # If no search query is provided, display an error message
            if not search_query:
                messages.error(request, "Search criteria needed!")

            # Define queries
            # to search for the provided search query

            queries = Q(answer__title__icontains=search_query) | Q(question__icontains=search_query)
            # Filter videos based on search queries
            questions = questions.filter(queries)

    context = {
        'questions': questions,
        'films': films,
        'genres': genres,
        'genre_chosen': genre_chosen,
    }
    return render(request, 'workshed/question_list.html', context)


@user_passes_test(lambda u: u.is_staff)
def new_question(request):

    question = None

    if request.method == 'POST':
        form = QuestionForm(data=request.POST)
        if form.is_valid():
            question = form.save(commit=False)
            question.save()
            messages.add_message(request, messages.SUCCESS, f"Question added successfully")
            return HttpResponseRedirect(reverse('questions'))
    else:

        form = QuestionForm()
    
    context = {
        'form': form,
        'question': question,
    }

    return render(request, 'workshed/new_question.html', context)
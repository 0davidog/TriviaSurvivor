from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from data.models import Genre, Question
from user.models import UserData
from .serializers import QuestionSerializer

class AuthStatusView(APIView):
    """
    A view to pass authentication data to javascript
    Uses class-based views via APIView from rest_framework.views.
    The get method is triggered on HTTP GET requests.
    It checks if a user is authenticated:
    Returns is_authenticated as a boolean.
    Returns username if authenticated, otherwise None.
    """
    
    def get(self, request):
        return Response({
            'is_authenticated': request.user.is_authenticated,
            'username': request.user.username if request.user.is_authenticated else None
        })

def index(request):
    """
    A view to return the index page.
    Set up empty user_data and icon_url variables.
    IF user is logged in
    THEN TRY get user data and icon url.
    ELSE leave variables empty.
    """

    user_data = None
    icon_url = None

    if request.user.is_authenticated:
        try:
            user_data = UserData.objects.get(user=request.user)
            icon_url = f"images/player_icons/icon{user_data.player_icon}.png"
        except UserData.DoesNotExist:
            user_data = None
            icon_url = None


    genres = Genre.objects.all().order_by('id')
    questions = Question.objects.all()

    context = {
        'user_data': user_data,
        'icon_url': icon_url,
        'genres': genres,
        'questions': questions,
    }

    return render(request, 'game/index.html', context)


@api_view(['GET'])
def get_filtered_questions(request):
    """
    Function-based view using the @api_view(['GET']) decorator from DRF.
    Retrieves a genre from query parameters (?genre=zombies, etc.).
    Filters questions by genre, if provided.
    Serializes and returns the data as JSON.
    """
    genre = request.GET.get('genre')

    queryset = Question.objects.all()
    if genre:
        queryset = queryset.filter(genre__genre_name=genre)
    
    serializer = QuestionSerializer(queryset, many=True)
    return Response(
        {
            'questions': serializer.data
        }
    )


@api_view(['GET'])
def get_creature_name(request):
    """
    Function-based view using the @api_view(['GET']) decorator from DRF. 
    Retrieves a genre from query parameters (?genre=zombies, etc.).
    Fetches the Genre model instance and returns its creature_name.
    Returns the data as JSON
    """
    genre_name = request.GET.get('genre')
    genre = Genre.objects.get(genre_name=genre_name)
    return Response({'creature_name': genre.creature_name})
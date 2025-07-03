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
    """
    
    def get(self, request):
        return Response({
            'is_authenticated': request.user.is_authenticated,
            'username': request.user.username if request.user.is_authenticated else None
        })

def index(request):
    """
    A view to return the index page.
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


    genres = Genre.objects.all()
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
    genre_name = request.GET.get('genre')
    print(genre_name)
    genre = Genre.objects.get(genre_name=genre_name)
    print(genre)
    return Response({'creature_name': genre.creature_name})
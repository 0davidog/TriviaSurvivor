# triviasurvivor/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AuthStatusView, get_filtered_questions, get_genre_data, FlagViewSet, GameViewSet

# Create a DRF router
router = DefaultRouter()
router.register(r'flag_question', FlagViewSet)
router.register(r'record_game', GameViewSet)

urlpatterns = [
    path('', views.index, name='index'),  # homepage

    # API endpoints
    path('api/auth-status/', AuthStatusView.as_view(), name='auth_status'),
    path('api/questions/', get_filtered_questions, name='get_filtered_questions'),
    path('api/genre-data/', get_genre_data, name='get_genre_data'),

    # Include all router endpoints under /api/
    path('api/', include(router.urls)),

]
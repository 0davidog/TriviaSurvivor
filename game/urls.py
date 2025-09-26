# triviasurvivor/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import AuthStatusView, get_filtered_questions, get_creature_name, FlagViewSet

# Create a DRF router
router = DefaultRouter()
router.register(r'flag_question', FlagViewSet)

urlpatterns = [
    path('', views.index, name='index'),  # homepage

    # API endpoints
    path('api/auth-status/', AuthStatusView.as_view(), name='auth_status'),
    path('api/questions/', get_filtered_questions, name='get_filtered_questions'),
    path('api/creature-name/', get_creature_name, name='get_creature_name'),

    # Include all router endpoints under /api/
    path('api/', include(router.urls)),

]
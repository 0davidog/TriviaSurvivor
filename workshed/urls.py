"""
URL configuration for triviasurvivor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import workshed, film_list, film_detail, new_film, question_list, new_question

urlpatterns = [
    path('', workshed, name='workshed'),
    path('films/', film_list, name='films'),
    path('questions/', question_list, name='questions'),
    path('films/new', new_film, name='new_film'),
    path('questions/new', new_question, name='new_question'),
    path('films/<int:id>', film_detail, name='film_detail'),
]
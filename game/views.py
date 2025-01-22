from django.shortcuts import render

# Create your views here.


def index(request):
    """
    A view to return the index page.
    """
    # Render the index page with the provided context
    return render(request, 'game/index.html')
from django.shortcuts import render
from .models import Coffee



def home(request):
    coffee = Coffee.objects.all()
    return render(request, 'home.html',)
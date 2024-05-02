from django.shortcuts import render
from .models import CoffeeOption

def home(request):
    options = CoffeeOption.objects.all()
    return render(request, 'myproject/home.html', {'options': options})
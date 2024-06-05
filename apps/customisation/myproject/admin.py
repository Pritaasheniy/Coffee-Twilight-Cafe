from django.contrib import admin
from .models import CoffeeOption  

class CoffeeOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'quantity')  

admin.site.register(CoffeeOption, CoffeeOptionAdmin)

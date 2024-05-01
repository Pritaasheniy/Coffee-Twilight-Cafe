from django.urls import path, include
from django.contrib import admin  
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include('myDjango.urls')),
]
urlpatterns+=staticfiles_urlpatterns()

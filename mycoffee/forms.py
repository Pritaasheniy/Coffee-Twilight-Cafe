from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.forms.widgets import PasswordInput, TextInput
from .models import Review

class CreateUserForm(UserCreationForm):
    
    class Meta: 
        
        model = User
        fields = ['username', 'email', 'password1', 'password2']

# Authenticate a user (Model Form)

class LoginForm(AuthenticationForm):
    
    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['username', 'rating', 'comment', 'ordered_item']
        widgets = {
            'rating': forms.RadioSelect(choices=[
                (1, '⭐'),
                (2, '⭐⭐'),
                (3, '⭐⭐⭐'),
                (4, '⭐⭐⭐⭐'),
                (5, '⭐⭐⭐⭐⭐')
            ]),
        }   

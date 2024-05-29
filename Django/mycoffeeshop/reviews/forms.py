from django import forms
from .models import Review

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
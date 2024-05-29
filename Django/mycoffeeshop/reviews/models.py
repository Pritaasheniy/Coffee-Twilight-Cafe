from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    username = models.CharField(max_length=100)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    ordered_item = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.ordered_item}"


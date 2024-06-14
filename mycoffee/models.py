from django.db import models

class CartItem(models.Model):
    title = models.CharField(max_length=100)
    image = models.URLField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class FinalizedCart(models.Model):
    items = models.ManyToManyField(CartItem)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart {self.id} - ${self.total_price}'


class Review(models.Model):
    username = models.CharField(max_length=100)
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    ordered_item = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.ordered_item}"

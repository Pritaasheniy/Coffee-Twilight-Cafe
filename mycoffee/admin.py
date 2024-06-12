from django.contrib import admin
from .models import CartItem, FinalizedCart


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category')

@admin.register(FinalizedCart)
class FinalizedCartAdmin(admin.ModelAdmin):
    list_display = ('id', 'total_price', 'created_at')
    filter_horizontal = ('items',)

# Register your models here.

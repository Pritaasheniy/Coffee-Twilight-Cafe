from django.contrib import admin
from .models import CartItem, FinalizedCart
from .models import Review


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category')

@admin.register(FinalizedCart)
class FinalizedCartAdmin(admin.ModelAdmin):
    list_display = ('id', 'total_price', 'created_at')
    filter_horizontal = ('items',)

    
admin.site.register(Review)

# Register your models here.

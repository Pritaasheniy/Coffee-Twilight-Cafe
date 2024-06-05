from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from myproject import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myproject.urls')),
    path('home/', views.home, name='home'),
    path('product/<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('add-to-cart/<int:coffee_option_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart_detail, name='cart'),
]

urlpatterns += staticfiles_urlpatterns()


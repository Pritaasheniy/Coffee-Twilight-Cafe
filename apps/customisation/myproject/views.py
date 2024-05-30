from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import DetailView
from .models import CoffeeOption, CustomisationOption, CartItem 


def home(request):
    coffee_options = CoffeeOption.objects.all()
    return render(request, 'myproject/home.html', {'coffee_options': coffee_options})

class ProductDetailView(DetailView):
    model = CoffeeOption
    template_name = 'myproject/product_detail.html'
    context_object_name = 'coffee_option'



    def get_context_data(self, **kwargs):
        context = super(ProductDetailView, self).get_context_data(**kwargs)  
        coffee_option = self.get_object() 
        context['customisation_options'] = CustomisationOption.objects.filter(coffee_option=coffee_option)
        return context


def add_to_cart(request, coffee_option_id):
    if request.method == 'POST':
        coffee_option = get_object_or_404(CoffeeOption, pk=coffee_option_id)
        customisation_option_id = request.POST.get('customisation_option')
        customisation_option = get_object_or_404(CustomisationOption, pk=customisation_option_id)
        quantity = int(request.POST.get('quantity', 1))

        cart_item, created = CartItem.objects.get_or_create(
            coffee_option=coffee_option,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        cart_item.customisation_options.add(customisation_option)
        return redirect('cart')
    
    
def cart_detail(request):
    cart_items = CartItem.objects.all()
    total_price = sum(item.total_price() for item in cart_items)
    return render(request, 'myproject/cart_detail.html', {'cart_items': cart_items, 'total_price': total_price})

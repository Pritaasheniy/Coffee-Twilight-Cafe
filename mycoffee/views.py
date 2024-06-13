from django.shortcuts import render , redirect
from . forms import CreateUserForm, LoginForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.contrib.auth.forms import SetPasswordForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CartItem, FinalizedCart
from .models import Review
from .forms import ReviewForm

# Authentication
from django.contrib.auth.models import auth

from django.contrib.auth import authenticate, login, logout


# CUSTOM PASSWORD

def custom_password_reset_confirm(request, uidb64=None, token=None):
    
    assert uidb64 is not None and token is not None  # checked by URLconf
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        # Token is valid, proceed with password reset
        if request.method == 'POST':
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                form.save()
                login(request, user)
                return redirect('password_reset_complete')
        else:
            form = SetPasswordForm(user)
        return render(request, 'cafe/password_reset_confirm.html', {'form': form})
    else:
        # Log the issue and return an error
        return HttpResponse('Password reset link is invalid or has expired')



# HOMEPAGE
def homepage(request):
    
    return render(request, 'cafe/index.html')


#REGISTER
def register(request):
    
    form = CreateUserForm()
    
    if request.method == "POST":
        
        form = CreateUserForm(request.POST) 
        
        if form.is_valid():
            
            form.save()
            
            return redirect ("login")
    
    
    context = {'registrationform':form}
    
    return render(request, 'registration/register.html',context=context)


#LOGIN
def my_login(request):

    form = LoginForm()
    
    if request.method == "POST":
        
        form = LoginForm(request, data=request.POST)
        
        if form.is_valid():
            
            username = request.POST.get('username')
            password = request.POST.get('password')
            
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                
                auth.login(request, user)
                
                return redirect("dashboard")
            
    context = {'loginform' :form}
    
    return render(request, 'registration/login.html', context=context)


#DASHBOARD
def dashboard(request):
   return render(request, 'registration/dashboard.html')

def index_view(request):
    return render(request, 'index.html')

# COFFEE PAGE WITH PRODUCT DATA
def customise(request):
    product = {
        "coffeeTypes": [
            {"id": 0, "image": "/mycoffee/static/images/flatwhite.jpg", "title": "Flat White", "price": 12},
            {"id": 1, "image": "/mycoffee/static/images/cappuchino.jpg", "title": "Cappuchino", "price": 13},
            {"id": 2, "image": "/mycoffee/static/images/frappuchino.jpg", "title": "Frappuchino", "price": 14},
            {"id": 3, "image": "/mycoffee/static/images/latte.jpg", "title": "Latte", "price": 12},
            {"id": 4, "image": "/mycoffee/static/images/mocha.jpg", "title": "Mocha", "price": 12},
        ],
        "cupSizes": [
            {"id": 5, "image": "/mycoffee/static/images/smallcup.png", "title": "Small(10oz)", "price": 1},
            {"id": 6, "image": "/mycoffee/static/images/mediumcup.png", "title": "Regular(12oz)", "price": 1},
            {"id": 7, "image": "/mycoffee/static/images/largecup.png", "title": "Large(16oz)", "price": 1},
        ],
        "temperature": [
            {"id": 8, "image": "/mycoffee/static/images/hot.png", "title": "Hot", "price": 1},
            {"id": 9, "image": "/mycoffee/static/images/cold.png", "title": "Cold", "price": 1},
        ],
        "beansOptions": [
            {"id": 10, "image": "/mycoffee/static/images/arabica.jpg", "title": "Arabica", "price": 0.0},
            {"id": 11, "image": "/mycoffee/static/images/robusta.jpg", "title": "Robusta", "price": 0.0},
            {"id": 12, "image": "/mycoffee/static/images/excelsa.jpg", "title": "Excelsa", "price": 0.0},
            {"id": 13, "image": "/mycoffee/static/images/liberica.jpg", "title": "Liberica", "price": 0.0},
        ],
        "milkTypes": [
            {"id": 14, "image": "/mycoffee/static/images/coconutmilk.png", "title": "Coconut Milk", "price": 1},
            {"id": 15, "image": "/mycoffee/static/images/freshmilk.png", "title": "Fresh Milk", "price": 1},
            {"id": 16, "image": "/mycoffee/static/images/creammilk.png", "title": "Cream Milk", "price": 1},
        ],
        "blendingOptions": [
            {"id": 17, "image": "/mycoffee/static/images/almond.png", "title": "Almond", "price": 1.00},
            {"id": 18, "image": "/mycoffee/static/images/hazelnut.png", "title": "Hazelnut", "price": 1},
            {"id": 19, "image": "/mycoffee/static/images/cinnamon.png", "title": "Cinnamon", "price": 1},
            {"id": 20, "image": "/mycoffee/static/images/vanilla.png", "title": "Vanilla", "price": 1},
        ],
        "toppingsOptions": [
            {"id": 21, "image": "/mycoffee/static/images/whippedcream.png", "title": "Whipped Cream", "price": 0.0},
            {"id": 22, "image": "/mycoffee/static/images/chocolatesyrup.png", "title": "Chocolate Syrup", "price": 0.0},
            {"id": 23, "image": "/mycoffee/static/images/chocolatechip.png", "title": "Chocolate Chip", "price": 0.0},
            {"id": 24, "image": "/mycoffee/static/images/caramel.png", "title": "Caramel Drizzle", "price": 0.0},
        ]
    }
    return render(request, 'coffee/customise.html', {'product': product})

@csrf_exempt
def save_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Process and save data as needed
        print('Data received:', data)
        return JsonResponse({"message": "Data sent successfully!"}, status=200)
    return JsonResponse({"error": "Invalid request method."}, status=400)


@csrf_exempt
def save_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        cart_items = []
        total_price = 0

        for item in data:
            cart_item = CartItem(
                title=item['title'],
                image=item['image'],
                price=item['price'],
                category=item['category']
            )
            cart_item.save()
            cart_items.append(cart_item)
            total_price += item['price']

        finalized_cart = FinalizedCart(total_price=total_price)
        finalized_cart.save()
        finalized_cart.items.set(cart_items)

        return JsonResponse({"message": "Data sent successfully!"}, status=200)
    return JsonResponse({"error": "Invalid request method."}, status=400)

def finalized_carts(request):
    carts = FinalizedCart.objects.all()
    return render(request, 'finalized_carts.html', {'carts': carts})


def review_list(request):
    reviews = Review.objects.all()
    return render(request, 'review/review_list.html', {'reviews': reviews})

def add_review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('review_list')
    else:
        form = ReviewForm()
    return render(request, 'review/add_review.html', {'form': form})





#LOGOUT
def logout(request):
    
    auth.logout(request)
    
    return redirect("login")



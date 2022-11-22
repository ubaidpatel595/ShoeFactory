from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
# Create your views here.
def index(request):
    return render(request,'index.html')

def brands(request):
    return render(request,'brands.html')

def about(request):
    return render(request,'index.html')

def privacy(request):
    return render(request,'index.html')

def login_user(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        passw = request.POST.get("password")
        auth_user = authenticate(request,username=username,password=passw)
        if (auth_user != None):
            login(request,auth_user)
            return redirect("/")
        else:
            messages.success(request,"Incorect Password")
    return render(request,'login.html')

def signup(request):
    return render(request,'signup.html')

def myprofile(request):
    return render(request,'index.html')

def cart(request):
    return render(request,'index.html')

def wishlist(request):
    return render(request,'index.html')

def logout_user(request):
    logout(request)
    return redirect("/")

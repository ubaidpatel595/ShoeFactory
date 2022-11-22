from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.models import User
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
    if request.method == 'POST':
        mobile = request.POST.get("mobile")
        fname = request.POST.get("firstname")
        lname = request.POST.get("lastname")
        user_email = request.POST.get("email")
        passw = request.POST.get("password")
        user_create = User.objects.create_user(username=mobile,email=user_email,password=passw)
        user_create.first_name = fname
        user_create.last_name = lname
        if str(user_create) == str(mobile):
            login(request,user_create)
            messages.success(request,"Signup Success you will be redirected")
            context={"meta_redirect":"refresh"}
            return render(request,'signup.html',context)
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

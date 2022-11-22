from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.models import User
from datetime import datetime
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
def productlisting(request):
    if request.method == "POST":
        #Generating Unique File Name
        curr_time=str(datetime.now())
        curr_time = curr_time[0:24]
        sym=[" ","-",".",":"]
        time_string=""
        for char in curr_time:
            if char in sym :
                continue
            else:
                time_string +=char
        print(time_string)
        #Uploading File to Srver
        files = request.FILES
        for file in files:
           upload_file = files[file]
           file_write = open(f"static/uploads/{time_string}{str(files[file])}","wb+")
           for chunk in upload_file.chunks():
            file_write.write(chunk)
           file_write.close()
    return render(request,'addproduct.html')
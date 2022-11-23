from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.models import User
from datetime import datetime
from home.models import products
#Function For Generating Unique String
def uniq_str():
    curr_time=str(datetime.now())
    curr_time = curr_time[0:24]
    sym=[" ","-",".",":"]
    time_string=""
    for char in curr_time:
        if char in sym :
            continue
        else:
            time_string +=char
    return time_string
# Create your views here.

def index(request):
    all_products = products.objects.all()
    context = {"all_products":all_products}
    return render(request,'index.html',context)

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
        pid = uniq_str()
        title = request.POST.get("title")
        price = request.POST.get("price")
        mrp = request.POST.get("mrp")
        desc = str(request.POST.get("desc"))
        delivery = request.POST.get("delivery")
        image_list=[]
        #Uploading File to Server
        files = request.FILES
        for file in files:
           file_name = uniq_str()+str(files[file])
           upload_file = files[file]
           image_list.append(file_name)
           file_write = open(f"static/uploads/{file_name}","wb+")
           for chunk in upload_file.chunks():
            file_write.write(chunk)
           file_write.close()
        list_product = products(pid=pid,title=title,price=price,mrp=mrp,delivery=delivery,desc=desc,images=image_list)
        list_product.save()
    return render(request,'addproduct.html')
def test(request):
    all_products = products.objects.all()
    all_l = []
    prod=[]
    for x in all_products:
        prod.append(x.pid)
        prod.append(x.title)
        prod.append(x.price)
        prod.append(x.mrp)
        prod.append(x.delivery)
        prod.append(x.desc)
        prod.append(eval(x.images))
        all_l.append(prod)
        prod=[]
    p=str(all_l)
    cont ={"image_list":str(x),}
    return render(request,'test.html',cont)
def api(request):
    all_products = products.objects.all()
    all_l = []
    prod=[]
    for x in all_products:
        prod.append(x.pid)
        prod.append(x.title)
        prod.append(x.price)
        prod.append(x.mrp)
        prod.append(x.delivery)
        prod.append(x.desc)
        prod.append(eval(x.images))
        all_l.append(prod)
        prod=[]
    p=str(all_l)
    return HttpResponse(p)
def prod_page(request):
    pi = request.GET.get('pid')
    #return HttpResponse(pi)
    return render(request,"product.html")
def api_product(request):
    get_pid = request.GET.get('pid')
    obj = products.objects.get(pid=get_pid)
    obj.images
    obj.title
    obj.price
    obj.mrp
    obj.desc
    obj.delivery
    return HttpResponse(obj.images)
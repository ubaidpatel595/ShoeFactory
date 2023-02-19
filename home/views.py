from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.contrib.auth.models import User
from datetime import datetime
from home.models import products,featured,cart_items
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
    print(time_string)
    return time_string
# Create your views here.

def index(request):
    all_products = products.objects.all()
    context = {"request_user":request.user}
    return render(request,'index.html',context)

def brands(request):
    return render(request,'brands.html')

def about(request):
    return render(request,'about.html')

def privacy(request):
    return render(request,'privacy.html')

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
    user = User.objects.get(username=request.user)
    context = {"user": user}
    return render(request,'myprofile.html',context)

def cart_api(request):
    user_id = request.user
    items = cart_items.objects.filter(user_name = user_id)
    items_list = []
    for x in items:
        prod_det = []
        pid = (x.pid.pid)
        prod = products.objects.get(pid=pid) 
        prod_det.append(prod.pid)
        prod_det.append(prod.title)
        prod_det.append(prod.price)
        prod_det.append(prod.mrp)
        prod_det.append(str(eval(prod.images)[0]))
        items_list.append(prod_det)
    return HttpResponse(str(items_list))
def cart(request):
    return render(request,"cart.html")
def wishlist(request):
    return render(request,'wishlist.html')
def order(request):
    return render(request,"orders.html")
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
    response_list = []
    get_pid = request.GET.get('pid')
    prod_n = products.objects.get(pid=get_pid)
    response_list.append(str(prod_n.title))
    response_list.append(str(prod_n.price))
    response_list.append(str(prod_n.mrp))
    response_list.append(str(prod_n.delivery))
    response_list.append(str(prod_n.desc))
    response_list.append(eval(prod_n.images))
    print(response_list)
    return HttpResponse(str(response_list))
def api_featured(request):
     featured_prods = featured.objects.all()
     ls=[]
     for x in featured_prods:
        pl=[]
        pid = x.pid.pid
        prod_details = products.objects.get(pid=pid)
        prod_title = prod_details.title
        prod_price = prod_details.price
        prod_mrp = prod_details.mrp
        prod_desc = prod_details.desc
        prod_img = eval(prod_details.images)
        pl.append(pid)
        pl.append(prod_title)
        pl.append(prod_price)
        pl.append(prod_mrp)
        pl.append(str(prod_img[0]))
       # pl.append(prod_desc)
        ls.append(pl)
     return HttpResponse(str(ls))
def cart_add(request):
    pid=str(request.GET.get("pid"))
    cart_obj = cart_items(pid=products.objects.get(pid=pid),user_name=User.objects.get(username=request.user))
    cart_obj.save()
    return HttpResponse("True")
def count_cart(request):
    if request.user.is_authenticated:
        prod_cnt = len(cart_items.objects.filter(user_name = request.user)) 
    else:
        prod_cnt = 0
    return HttpResponse(prod_cnt)
def checkout(request):
    pid = request.GET.get("pid")
    return render(request,'checkout.html')
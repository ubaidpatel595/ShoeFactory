from django.urls import path
from home import views
urlpatterns = [
    path('',views.index),
    path('index.html',views.index),
    path('brands.html',views.brands),
    path('login.html',views.login_user),
    path('signup.html',views.signup),
    path('logout.html',views.logout_user),
    path('productlisting',views.productlisting),
    path('test',views.test),
    path('api',views.api),
    path('products',views.prod_page),
    path('api/product',views.api_product),
]

from django.contrib import admin
from home.models import products,featured,cart_items

# Register your models here.
admin.site.register(products),
admin.site.register(featured),
admin.site.register(cart_items)

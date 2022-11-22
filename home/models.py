from django.db import models

# Create your models here.
class products(models.Model):
    pid = models.AutoField(primary_key=True)
    title = models.TextField(max_length=200,default="")
    price = models.TextField(max_length=6,default="")
    mrp = models.TextField(max_length=6,default="")
    delivery = models.TextField(max_length=2,default="")
    desc = models.TextField(max_length=500,default="")
    images = models.TextField(max_length=500,default="")
    def __str__(self):
        return f"Pid:{str(self.pid)}"
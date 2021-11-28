from django.db import models

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200 ,default="zefef")
    email = models.EmailField()
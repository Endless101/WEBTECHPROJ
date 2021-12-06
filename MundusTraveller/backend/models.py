from django.db import models
from django.db.models.fields import EmailField

class CreateUserModel(models.Model):
    firstname = models.CharField(max_length=200, default=None)
    lastname = models.CharField(max_length=200, default=None)
    password = models.CharField(max_length=200, default=None)
    confirmPassword = models.CharField(max_length=200)
    email = models.EmailField(default=None)
    DOB = models.CharField(max_length=200,default=None)
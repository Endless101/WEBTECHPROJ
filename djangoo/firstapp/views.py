from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def sayhello(request): 
    return render(request, template_name='hello.html')
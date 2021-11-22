from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView

# Create your views here.



def sayhello(request): 
    name = 'Taoufik'
    numbers = {5,6,7,8,9}
    args = {'name': name, 'numbers': numbers}
    return render(request, template_name='basic/hello.html',context= args)


from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'frontend/index.html')


def createUser(request):
    return render(request, 'frontend/createuser.html')


def add(request):
    if request.method == 'POST':
        print("request recieved\n")
    return HttpResponse
#from _typeshed import Self
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import CreateUserSerializer
from .models import CreateUserModel
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from rest_framework.response import Response

# Create your views here.

def main(request):
    return HttpResponse("<h1>Hello</h1>")
#class CreateUserView(generics.ListCreateAPIView):
    
   
 #   def post(self, request,format=None):
  #      if not self.request.session.exists(self.request.session.session_key):
   #         self.request.session.create()
        
    #    serializer = self.serializer_class(data=request.data)

     #   if serializer.is_valid():
      #     firstname = serializer.data['firstname']
       #    lastname = serializer.data['lastname']
        #   password = serializer.data['password']
         #  email = serializer.data['email']
          # DOB = serializer.data['DOB']
           #createuser = CreateUserModel(firstname=firstname, lastname=lastname,password=password,email=email)
           #createuser.save()
           #return HttpResponseRedirect('/succes/')


def postCreateUserModel(request):
    queryset = CreateUserModel.objects.all()
    serializer_class = CreateUserSerializer
        
    serializer = serializer_class(data=request.POST)

    if  serializer.is_valid():
           firstname = serializer.data['firstname']
           lastname = serializer.data['lastname']
           password = serializer.data['password']
           email = serializer.data['email']
           DOB = serializer.data['DOB']
           createuser = CreateUserModel(firstname=firstname, lastname=lastname,password=password,email=email, DOB=DOB)
           createuser.save()
           return HttpResponseRedirect('../succes/')

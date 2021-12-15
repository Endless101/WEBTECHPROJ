#from _typeshed import Self
from django.db.models.fields import EmailField
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import CreateUserSerializer, LoginSerializer, ReviewSerializer, UpdateReviewSerializer
from .models import CreateUserModel, ReviewModel
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json

def prettyprint(obj):
    print('\n')
    print(obj)
    print('\n')

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
        try: 
            obj = CreateUserModel.objects.get(email=email)
        except ObjectDoesNotExist:
            createuser = CreateUserModel(firstname=firstname, lastname=lastname,password=password,email=email, DOB=DOB)
            createuser.save()
        finally:
             return HttpResponseRedirect('../succes/')



           
           


def postLogin(request):
    serializer_class = LoginSerializer
    serializer = serializer_class(data=request.POST)
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    if serializer.is_valid():
        print("efzefz")
        postemail = serializer.data['email']
        postpassword = serializer.data['password']
        try:
            obj = CreateUserModel.objects.get(email=postemail)
        except ObjectDoesNotExist:
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        objpassword = obj.password
        if(postpassword == objpassword):
            request.session['email'] = postemail
            prettyprint(request.session['email'])
            return HttpResponseRedirect('./succes/')
        else: return print("efzefz")



def postReview(request):
    if request.method == 'POST':
        session = request.session
        serializer_class = ReviewSerializer
        serializer = serializer_class(data=request.POST)
        prettyprint(session) 
    
        if serializer.is_valid():
            review_data = serializer.data['review']
            review_rating = serializer.data['rating']
            review_country = serializer.data['country']
            review_user = session['email']
            review = ReviewModel(review=review_data, email=review_user, rating=review_rating, country=review_country)
            prettyprint(review.email)
            review.save()
            return HttpResponseRedirect('../succes/')
        else: prettyprint(serializer.data)
    elif request.method == 'GET':
        data = ReviewModel.objects.all()
        ls = {}
        idx = 0
        for e in data:
            ls['review' + str(idx)] = {'review': e.review,
                                        'email': e.email,
                                        'country': e.country}
            idx = idx + 1
        prettyprint(ls)
        data = { 
            "reviews": ls
        
        }
        return JsonResponse(ls)
    elif request.method == 'PUT':
            data = eval(request.body.decode())
            serializer_class = UpdateReviewSerializer
            serializer = serializer_class(data=data)
            if serializer.is_valid():
                oldContent = serializer.data['oldContent']
                newContent = serializer.data['newContent']
                obj = ReviewModel.objects.get(review=oldContent)
                obj.review = newContent
                obj.save()
                return HttpResponse(status=200)
    elif request.method == 'DELETE':
        prettyprint(request.method)
        data = eval(request.body.decode())
        prettyprint(data)
        
        to_be_deleted = data['review']
        obj = ReviewModel.objects.get(review = to_be_deleted[1:])
        obj.delete()
        return HttpResponse(status=200)


def updateReview(request):
    prettyprint(request.method)
    data = eval(request.body.decode())
    serializer_class = UpdateReviewSerializer
    if request.method == 'PUT':
        serializer = serializer_class(data=data)
        if serializer.is_valid():
            oldContent = serializer.data['oldContent']
            newContent = serializer.data['newContent']
            obj = ReviewModel.objects.get(review=oldContent)
            obj.review = newContent
            obj.save()


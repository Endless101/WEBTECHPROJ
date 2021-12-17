#from _typeshed import Self
from django.db.models.fields import EmailField
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import CreateUserSerializer, LikeSerializer, LoginSerializer, ReviewSerializer, UpdateReviewSerializer
from .models import CreateUserModel, LikeModel, ReviewModel
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
        username = serializer.data['username']
        password = serializer.data['password']
        email = serializer.data['email']
        DOB = serializer.data['DOB']
        try: 
            obj = CreateUserModel.objects.get(email=email)
        except ObjectDoesNotExist:
            createuser = CreateUserModel(firstname=firstname, lastname=lastname,username=username,password=password,email=email, DOB=DOB)
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
            return HttpResponseRedirect('../logout')
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
                                        'country': e.country,
                                        'rating': e.rating,
                                        'likes': e.likes}
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


def handleLogout(request):
    if request.method == 'GET':
        if request.session.exists(request.session.session_key):
            prettyprint(request.session.exists(request.session.session_key))
           # del request.session['email']
            request.session.delete()
            prettyprint(request.session.exists(request.session.session_key))
            return HttpResponse(status=200)



def handleLikes(request):
    serializer_class = LikeSerializer
    if request.method == 'POST':
        data= eval(request.body)
        serializer = serializer_class(data=data)
        if serializer.is_valid():
            prettyprint(serializer.data)
            currUser = request.session['email']
            writer = serializer.data['writer']
            review = serializer.data['review']
            def amountOfLikes(): return len(LikeModel.objects.filter(liker=currUser,writer=writer,review=review))
           # amount_of_likes = len(obj())
            if(amountOfLikes() == 0):
                Like = LikeModel(liker=currUser,writer=writer,review=review)
                Like.save()
                review_model = ReviewModel.objects.get(review=review)
                review_model.likes =  review_model.likes + amountOfLikes()
                review_model.save()
                return HttpResponse(status=200)
            else: return HttpResponse(status=304)
            
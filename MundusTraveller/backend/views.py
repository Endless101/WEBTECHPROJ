#from _typeshed import Self
from django.db.models.fields import EmailField
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import CreateUserSerializer, LikeSerializer, LoginSerializer, ReviewSerializer, UpdateReviewSerializer, CountryRatingSerializer
from .models import CreateUserModel, LikeModel, ReviewModel, CountryRatingModel
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json
import os

with open("frontend/src/data/europe_countries.json") as countries:
    europe_countries = json.load(countries)

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
    inputs = {}
    errors = {}
    prettyprint(request.POST)
    queryset = CreateUserModel.objects.all()
    serializer_class = CreateUserSerializer
    serializer = serializer_class(data=request.POST)
        
    

    if  serializer.is_valid():
        firstname = serializer.data['firstname']
        lastname = serializer.data['lastname']
        username = serializer.data['username']
        password = serializer.data['password']
        confirmPassword = serializer.data['confirmPassword']
        email = serializer.data['email']
        DOB = serializer.data['DOB']
        inputs['firstname'] = firstname
        inputs['lastname'] = lastname
        

        if len(username) < 6:
            errors['username'] = "Username needs to be atleast 6 characters long"
        elif len(CreateUserModel.objects.filter(username=username)) != 0:
            errors['username'] = "Username is already registered"

        if len(password) < 8:
            errors['password'] = "Password must be atleast 8 characters long"

        if not (password == confirmPassword):
            errors['confirmPassword'] = "Passwords do not match"


        
        if (len(CreateUserModel.objects.filter(email=email)) != 0):
            errors['email'] = "This email is already registered"

        
        if len(errors) != 0:
            data = {
                'UserInfo': {
                    'errors': errors,
                    'inputs': inputs
                }
           }
            return JsonResponse(data,status=200)


        obj = CreateUserModel.objects.filter(email=email , username=username)
        if(len(obj) == 0): 
            createuser = CreateUserModel(firstname=firstname, lastname=lastname,username=username,password=password,email=email, DOB=DOB)
            createuser.save()
            return HttpResponse(status=201)
        else:
            data = {
                 'firstname': firstname,
                 'lastname': lastname,
                 'username': username,
                 'DOB': DOB,
             }
            return JsonResponse(data)
    else: return HttpResponseRedirect('HTTP_REFERER')
             



           
           


def postLogin(request):
    errors = {}
    serializer_class = LoginSerializer
    if not request.session.exists(request.session.session_key):
        request.session.create()
    if request.method == 'POST':
        serializer = serializer_class(data=request.POST)
        if serializer.is_valid():
            postemail = serializer.data['email']
            postpassword = serializer.data['password']
            try:
                obj = CreateUserModel.objects.get(email=postemail)
            except ObjectDoesNotExist:
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            objpassword = obj.password
            objusername = obj.username
            if(postpassword == objpassword):
                request.session['email'] = postemail
                request.session['username'] = objusername

                prettyprint(request.session['email'])
                return HttpResponseRedirect('../profile')
            else: return HttpResponseRedirect('HTTP_REFERER')
        else: HttpResponseRedirect('HTTP_REFERER')
    elif request.method == 'GET':
        data = request.GET
        email = data['email']
        objs = CreateUserModel.objects.filter(email = email)
        if len(objs) == 0:
            errors['email'] = "This email is not registered"
            return JsonResponse(errors)
        elif len(objs) == 1:
            errors['email'] = "This email is registered"
            return JsonResponse(errors)


def postReview(request):
    errors = {}
    if request.method == 'POST':
        session = request.session
        serializer_class = ReviewSerializer
        serializer = serializer_class(data=request.POST)
        prettyprint(session) 
    
        if serializer.is_valid():
            review_data = serializer.data['review']
            review_country = serializer.data['country']
            review_email = session['email']
            review_user = session['username']
            review = ReviewModel(review=review_data, email=review_email, username=review_user, country=review_country)
            prettyprint(review.email)
            review.save()
            return HttpResponse(status=201)
        else: 
                errors['review'] = "Please enter a country and a valid review"
                return JsonResponse(errors)
    elif request.method == 'GET':
        data = ReviewModel.objects.all()
        ls = {}
        idx = 0
        for e in data:
            ls['review' + str(idx)] = {'review': e.review,
                                        'username': e.username,
                                        'email': e.email,
                                        'country': e.country,
                                        'rating': e.rating,
                                        'likes': e.likes}
            idx = idx + 1
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
            else: return HttpResponseRedirect('HTTP_REFERER')
    elif request.method == 'DELETE':
        prettyprint(request.method)

        data = eval(request.body.decode())
        prettyprint(data['review'])

        
        to_be_deleted = data['review'][1:]
        obj = ReviewModel.objects.get(review = to_be_deleted)
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
            #prettyprint(serializer.data)
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

def getUser(request):
    errors = {}
    data = request.GET
    username = data['username']
    object = CreateUserModel.objects.filter(username=username)
    if(len(object) != 0):
        return HttpResponse(status=200)
    else:
         errors['username'] = "This user does not exist"
         return JsonResponse(errors,status=201, safe=False)

            
            
def checkCountryName(name):
    for i in europe_countries:
        if (i['name']==name):
            return True
    return False

def postAddCountry(request):
    if request.method == 'POST':
        session = request.session
        serializer_class = CountryRatingSerializer
        serializer = serializer_class(data=request.POST)
        prettyprint(europe_countries[0])


        if serializer.is_valid():
            print("serializer is valid")
            postcountry = serializer.data['countryname']
            if checkCountryName(postcountry):
                postscore = serializer.data['countryscore']
                useremail = session['email']
                newRating = CountryRatingModel(email=useremail, countryname=postcountry, countryscore=postscore)
                newRating.save()
                print("rating added")
        else: 
            print("serializer not valid")
    return HttpResponseRedirect('http://localhost:8000/profile')
    
def searchUserEmail(request):
    user = request.GET.get('user')
    session = request.session
    if (user == "self"):
        return session['email']
    else: 
        usermodel= CreateUserModel.objects.get(username=user)
        return usermodel.email

def getCountryList(request):
    useremail = searchUserEmail(request)
    countryList = []
    countryQueryset = CountryRatingModel.objects.filter(email=useremail)
    for obj in countryQueryset:
        countryList.extend([obj.countryname, obj.countryscore])
    prettyprint(countryList)
    return JsonResponse(countryList, status=status.HTTP_200_OK, safe=False)

def getUserInfo(request):
    if request.session.exists(request.session.session_key):
        session = request.session
        email = session['email']
        try:
            obj = CreateUserModel.objects.get(email=email)
        except ObjectDoesNotExist:
            return JsonResponse([], status=status.HTTP_200_OK, safe=False)
        firstname = obj.firstname
        lastname = obj.lastname
        username = obj.username
        DOB = obj.DOB
        userinfo = [firstname, lastname, username, email, DOB]
        return JsonResponse(userinfo, status=status.HTTP_200_OK, safe=False)

def getUserEmail(request):
    useremail = searchUserEmail(request)
    return JsonResponse(useremail, status=status.HTTP_200_OK, safe=False)
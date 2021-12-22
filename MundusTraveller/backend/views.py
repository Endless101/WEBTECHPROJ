from django.http import HttpResponse
from rest_framework import generics, serializers, status
from .serializers import CreateUserSerializer, LikeSerializer, LoginSerializer, ReviewSerializer, UpdateReviewSerializer, CountryRatingSerializer
from .models import CreateUserModel, LikeModel, ReviewModel, CountryRatingModel
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
import json


with open("frontend/src/data/europe_countries.json") as countries:
    europe_countries = json.load(countries)



# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello</h1>")


# A function that will handle a post request for registering a user 
# if everything is valid then we create a new entry. Otherwise we send back error messages to be displayed

def postCreateUserModel(request):
    errors = {}
    serializer_class = CreateUserSerializer
    serializer = serializer_class(data=request.POST)
        
    
# Form validation

    if  serializer.is_valid():
        firstname = serializer.data['firstname']
        lastname = serializer.data['lastname']
        username = serializer.data['username']
        password = serializer.data['password']
        confirmPassword = serializer.data['confirmPassword']
        email = serializer.data['email']
        DOB = serializer.data['DOB']


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
                }
           }
            return JsonResponse(data,status=200)

        # Saving the new user

        obj = CreateUserModel.objects.filter(email=email , username=username)
        if(len(obj) == 0): 
            createuser = CreateUserModel(firstname=firstname, lastname=lastname,username=username,password=password,email=email, DOB=DOB)
            createuser.save()
            return HttpResponse(status=201)
    else: return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
             



           
           
# Function that will handle the login functionality
# Will make a new session for the user
# Also handles AJAX get requests to check if the email is already registered

def postLogin(request):
    errors = {}
    serializer_class = LoginSerializer

    # Making a new session for our user

    if not request.session.exists(request.session.session_key):
        request.session.create()

    # When a post request is received and we need to validate the data received
    if request.method == 'POST':
        serializer = serializer_class(data=request.POST)
        if serializer.is_valid():
            postemail = serializer.data['email']
            postpassword = serializer.data['password']

            # Check if our email is registered or not.
            try:
                obj = CreateUserModel.objects.get(email=postemail)
            except ObjectDoesNotExist:
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            objpassword = obj.password
            objusername = obj.username

            # Password check

            if(postpassword == objpassword):
                request.session['email'] = postemail
                request.session['username'] = objusername
                return HttpResponseRedirect('../profile')

            else: return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

        else: HttpResponseRedirect(request.META.get('HTTP_REFERER'))

    # Axios get request send from the client-side to see if the email is registered or not.

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


# Function that will handle all opertations on reviews which includes listing, creating, editing and deleting.

def postReview(request):
    errors = {}

    # Post requests will be handled in the first if branch

    if request.method == 'POST':
        session = request.session
        serializer_class = ReviewSerializer
        serializer = serializer_class(data=request.POST)

        # Check for validity and save to our table
       
        if serializer.is_valid():
            review_data = serializer.data['review']
            review_country = serializer.data['country']
            review_email = session['email']
            review_user = session['username']
            review = ReviewModel(review=review_data, email=review_email, username=review_user, country=review_country)
           
            review.save()
            return HttpResponse(status=201)
        else: 
                errors['review'] = "Please enter a country and a valid review"
                return JsonResponse(errors)

    # Sends all the reviews to the client-side after receiving a get request.

    elif request.method == 'GET':
        data = ReviewModel.objects.all()
        ls = {}
        idx = 0
        for e in data:
            ls['review' + str(idx)] = {'review': e.review,
                                        'username': e.username,
                                        'email': e.email,
                                        'country': e.country,
                                        'likes': e.likes}
            idx = idx + 1
        data = { 
            "reviews": ls
        
        }
        return JsonResponse(ls)

    # Third branch of the if handles put requests where the incoming review will be updated with the new review

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
            else: return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

    # Handles delete requests and simply deletes the given review from the database

    elif request.method == 'DELETE':
    
        data = eval(request.body.decode())
      
        
        to_be_deleted = data['review'][1:]
        obj = ReviewModel.objects.get(review = to_be_deleted)
        obj.delete()
        return HttpResponse(status=200)

# Ends the session of a user.

def handleLogout(request):
    if request.method == 'GET':
        if request.session.exists(request.session.session_key):
            request.session.delete()
            return HttpResponse(status=200)

# Handles the likes of a review

def handleLikes(request):
    serializer_class = LikeSerializer
    
    # Validate the data

    if request.method == 'POST':
        data= eval(request.body)
        serializer = serializer_class(data=data)
        if serializer.is_valid():
            currUser = request.session['email']
            writer = serializer.data['writer']
            review = serializer.data['review']

            # Check if review already liked

            def amountOfLikes(): return len(LikeModel.objects.filter(liker=currUser,writer=writer,review=review))

             # If not add a new entry and calculate new amount of likes for review and update the amount of likes for that specific review

            if(amountOfLikes() == 0):
                Like = LikeModel(liker=currUser,writer=writer,review=review)
                Like.save()
                review_model = ReviewModel.objects.get(review=review)
                review_model.likes =  review_model.likes + amountOfLikes()
                review_model.save()
                return HttpResponse(status=200)
            else: return HttpResponse(status=304)

# Checks if the user is in the database via an AJAX get request
# Returns error message to the client-side if not found. 

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

            
# This function checks whether a given countryname is a valid country in Europe.
#
# The names of all the possible countrynames is stored in de jsonfile 'europe_countries'.           
def checkCountryName(countryname):
    for i in europe_countries:
        if (i['name']==countryname):
            return True
    return False


# Given a countryname and a countryscore, a new 'CountryRatingModel' is created by the currently logged-in user.
#
# This new element of the collection is stored in the database. 
def postAddCountry(request):
    if request.method == 'POST':
        session = request.session
        serializer_class = CountryRatingSerializer
        serializer = serializer_class(data=request.POST)

        if serializer.is_valid():
            postcountry = serializer.data['countryname']
            if checkCountryName(postcountry):
                postscore = serializer.data['countryscore']
                useremail = session['email']
                newRating = CountryRatingModel(email=useremail, countryname=postcountry, countryscore=postscore)
                newRating.save()
    return HttpResponseRedirect('http://localhost:8000/profile')


# Given the username of a user or the string "self" for the currently logged-in user,
# the corresponding email of this user is returned.
#
# The username of a user has to be at least six charachters so there is no risk that
# a user named 'self' can be mixed with the logged-in user.
def searchUserEmail(request):
    user = request.GET.get('user')
    session = request.session
    if (user == "self"):
        return session['email']
    else: 
        usermodel= CreateUserModel.objects.get(username=user)
        return usermodel.email


# Given a request with a certain username, the corresponding 'CountryRatingModel's 
# that were stored by this user are being fetched from the database.
#
# A list of 'countryname, countryscore'-pairs are returned to the frontend.
def getCountryList(request):
    useremail = searchUserEmail(request)
    countryList = []
    countryQueryset = CountryRatingModel.objects.filter(email=useremail)
    for obj in countryQueryset:
        countryList.extend([obj.countryname, obj.countryscore])
    return JsonResponse(countryList, status=status.HTTP_200_OK, safe=False)


# By taking the email from the currently active session the 'CreatUserModel' from the currently logged-in user is taken from database.
# 
# The personal info of the user, stored in this model, is then returned to the frontend
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

# This function only calls 'searchUserEmail' to get the email of a user.
# But this value is returned in a JsonReponse so that this function can be used to fetch the email
# of a user from the frontend.
def getUserEmail(request):
    useremail = searchUserEmail(request)
    return JsonResponse(useremail, status=status.HTTP_200_OK, safe=False)
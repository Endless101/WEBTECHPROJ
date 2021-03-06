from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Attributes for user table
class CreateUserModel(models.Model):
    firstname = models.CharField(max_length=200, default=None)
    lastname = models.CharField(max_length=200, default=None)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200, default=None)
    confirmPassword = models.CharField(max_length=200)
    email = models.EmailField(default=None)
    DOB = models.CharField(max_length=200,default=None)

# Model not saved but mainly used for the serializer and the is_valid function
class Login(models.Model):
    email = models.EmailField(default=None)
    password = models.CharField(max_length=200, default=None)

# Attributes for review table
class ReviewModel(models.Model):
    email = models.EmailField(default=None)
    username = models.CharField(max_length=200)
    review = models.CharField(max_length=500)
    country = models.CharField(max_length=200)
    likes = models.IntegerField(default=0)


# Model not saved but mainly used for the serializer and the is_valid function
class UpdateReviewModel(models.Model):
    oldContent = models.CharField(max_length=500)
    newContent = models.CharField(max_length=500)


# Attributes for Like table
class LikeModel(models.Model):
    liker = models.CharField(max_length=200)
    writer = models.CharField(max_length=200)
    review = models.CharField(max_length=500)


# A model that stores an email, the name of a country and a score.
#
# This links a user (via 'email') to a rating he has given to a country.
#
# This way each element the user adds to his collection is stored and retrievable.
class CountryRatingModel(models.Model):
    email = models.EmailField(default=None)
    countryname = models.CharField(max_length=200, default=None)
    countryscore = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(1)])
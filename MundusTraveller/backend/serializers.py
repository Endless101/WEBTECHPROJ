from django.db.models import fields
from rest_framework import serializers
from .models import CreateUserModel, LikeModel, Login, ReviewModel, UpdateReviewModel, CountryRatingModel


# Serializer for the CreateUserModel

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateUserModel
        name = serializers.CharField
        fields = ('firstname', 'lastname','username','password','confirmPassword','email','DOB',)

# Serializer for the LoginModel
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('email', 'password')

# Serializer for the ReviewModel
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewModel
        fields = ('review','country')

# Serializer for the UpdateReviewModel
class UpdateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdateReviewModel
        fields = ('oldContent', 'newContent',)

# Serializer for the LikeModel
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = ( 'writer','review')

class CountryRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryRatingModel
        fields = ('countryname', 'countryscore')

from django.db.models import fields
from rest_framework import serializers
from .models import CreateUserModel, LikeModel, Login, ReviewModel, UpdateReviewModel, CountryRatingModel

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateUserModel
        name = serializers.CharField
        fields = ('firstname', 'lastname','username','password','confirmPassword','email','DOB',)


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('email', 'password')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewModel
        fields = ('review','country')


class UpdateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdateReviewModel
        fields = ('oldContent', 'newContent',)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeModel
        fields = ( 'writer','review')

class CountryRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryRatingModel
        fields = ('countryname', 'countryscore')

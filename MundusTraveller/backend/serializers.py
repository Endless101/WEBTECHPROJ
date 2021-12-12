from django.db.models import fields
from rest_framework import serializers
from .models import CreateUserModel, Login

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateUserModel
        name = serializers.CharField
        fields = ('firstname', 'lastname','password','email','DOB',)


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('email', 'password')
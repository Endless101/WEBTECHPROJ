from django.db.models import fields
from rest_framework import serializers
from .models import CreateUserModel

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateUserModel
        name = serializers.CharField
        fields = ('firstname', 'lastname','password','email','DOB',)
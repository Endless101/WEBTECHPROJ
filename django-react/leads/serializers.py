from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('name', 'password','email')

class CreateLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('name', 'password', 'email')
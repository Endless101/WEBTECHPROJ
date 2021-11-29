from django.shortcuts import render
from .models import Lead
from .serializers import LeadSerializer, CreateLeadSerializer
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
import json

class LeadListCreate(generics.ListCreateAPIView):   
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class CreateLeadview(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = CreateLeadSerializer
    def post( request,format = None):
        print(request)
        print(request.method)
        if request.POST:
            print("oeihuiehie")
        else:
            print("\n")
            print("sed")
            print("\n")
        #print("\n")
        #print(json.loads(request.body.decode('utf-8')))
        #print("\n")
        #if not self.request.session.exists(self.request.session.session_key):
         #   self.request.session.create()

        #serializer = self.serializer_class(data=request.data)
        #if  not serializer.is_valid():
        #    name = serializer.data.name
         #   password = serializer.data.password
          #  email = serializer.data.email
           # lead = Lead(name, password, email)
            #return Response(LeadSerializer(lead).data, status =status.HTTP_200_OK)

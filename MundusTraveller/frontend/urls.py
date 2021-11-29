from django.urls import path
from django.urls.resolvers import URLPattern
from .views import index

urlpatterns = [
    path('', index)
]
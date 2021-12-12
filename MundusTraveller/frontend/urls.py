from django.urls import path
from django.urls.resolvers import URLPattern
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('profile', index),
    path('register', index),
    path('google', index),
]
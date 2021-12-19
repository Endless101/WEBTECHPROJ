from django.urls import path
from django.urls.resolvers import URLPattern
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('logout',index),
    path('review', index),
    path('profile', index),
    path('profile/<str:key>', index),
    path('profile/info', index),
    path('register', index),
    path('google', index),
    path('country/<str:key>', index),
    path('search', index)
]
from django.urls import path
from backend import views

urlpatterns = [
    path('home/', views.main),
    path('add/', views.postCreateUserModel),
    path('succes/', views.main)
]
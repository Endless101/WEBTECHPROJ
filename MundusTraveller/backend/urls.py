from django.urls import path
from backend import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('home/', views.main),
    path('add/', views.postCreateUserModel),
    path('succes/', views.main),
    path('login', views.postLogin),
    path('post/', views.postReview),
    path('logout/',views.handleLogout),
    path('likes/', views.handleLikes),
    path('addCountry/', views.postAddCountry),
    path('getCountryList/', views.getCountryList)
]
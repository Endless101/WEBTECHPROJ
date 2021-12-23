from django.urls import path
from backend import views

# URLs
urlpatterns = [
    path('home/', views.main),
    path('add/', views.postCreateUserModel),
    path('succes/', views.main),
    path('login', views.postLogin),
    path('post/', views.postReview),
    path('logout/',views.handleLogout),
    path('likes/', views.handleLikes),
    path('search/', views.getUser),
    path('addCountry/', views.postAddCountry),
    path('getCountryList/', views.getCountryList),
    path('getUserInfo', views.getUserInfo),
    path('getUserEmail', views.getUserEmail)
]
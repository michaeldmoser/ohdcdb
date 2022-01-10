from django.urls import path, include
from .api import LogoutApi, RegisterApi, LoginApi, UserApi
from rest_framework.authtoken import views

urlpatterns = [
    path('api/auth/', views.obtain_auth_token),
    path('api/auth/register', RegisterApi.as_view()),
    path('api/auth/login', LoginApi.as_view()),
    path('api/auth/user', UserApi.as_view()),
    path('api/auth/logout', LogoutApi.as_view()),
]

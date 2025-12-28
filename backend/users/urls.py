from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view()),
    path('reset-password/<int:uid>/<str:token>/', ResetPasswordView.as_view()),
    path('logout/', LogoutView.as_view()),

]

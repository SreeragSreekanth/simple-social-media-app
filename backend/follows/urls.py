from django.urls import path
from .views import *

urlpatterns = [
    path('toggle/<int:user_id>/', FollowToggleView.as_view()),
    path('status/<int:user_id>/', IsFollowingView.as_view()),
    path('followers/<int:user_id>/', FollowersListView.as_view()),
    path('following/<int:user_id>/', FollowingListView.as_view()),
]

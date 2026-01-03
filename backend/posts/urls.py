from django.urls import path
from .views import *

urlpatterns = [
    path('create/', PostCreateView.as_view()),
    path('feed/', FeedView.as_view()),
    path('my-posts/', MyPostsView.as_view()),
    path('delete/<int:pk>/', PostDeleteView.as_view()),
    path('following-feed/', FollowingFeedView.as_view()),

]

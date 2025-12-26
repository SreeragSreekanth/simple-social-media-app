from django.urls import path
from .views import LikeToggleView

urlpatterns = [
    path('toggle/<int:post_id>/', LikeToggleView.as_view()),
]

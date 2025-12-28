from django.urls import path
from .views import NotificationListView, MarkAsReadView

urlpatterns = [
    path('', NotificationListView.as_view()),
    path('read/<int:pk>/', MarkAsReadView.as_view()),
]

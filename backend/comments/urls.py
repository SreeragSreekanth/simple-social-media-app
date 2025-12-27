from django.urls import path
from .views import AddCommentView, CommentListView, DeleteCommentView

urlpatterns = [
    path('add/<int:post_id>/', AddCommentView.as_view()),
    path('list/<int:post_id>/', CommentListView.as_view()),
    path('delete/<int:pk>/', DeleteCommentView.as_view()),
]

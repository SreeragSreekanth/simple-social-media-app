from requests import post
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Comment
from .serializers import CommentSerializer
from posts.models import Post
from notifications.models import Notification
from notifications.utils import send_realtime_notification


class AddCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['post_id'])

        serializer.save(
            user=self.request.user,
            post=post
        )

        if post.user != self.request.user:
            Notification.objects.create(
                sender=self.request.user,
                receiver=post.user,
                notification_type='COMMENT',
                post_id=post.id                
            )
            send_realtime_notification(
        post.user.id,
        {
            "type": "COMMENT",
            "sender": self.request.user.full_name,
            "post_id": post.id
        }
    )

class CommentListView(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(post_id=self.kwargs['post_id'])


class DeleteCommentView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)

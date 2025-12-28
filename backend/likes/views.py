from requests import post
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from posts.models import Post
from .models import Like
from notifications.models import Notification


class LikeToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)

        like, created = Like.objects.get_or_create(
            user=request.user,
            post=post
        )

        if created:
            if post.user != request.user:
                Notification.objects.create(
                    sender=request.user,
                    receiver=post.user,
                    notification_type='LIKE',
                    post_id=post.id
                )
            return Response({
                "liked": True,
                "likes_count": post.likes.count()
            })

        like.delete()
        return Response({
            "liked": False,
            "likes_count": post.likes.count()
        })

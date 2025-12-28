from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from users.models import User
from .models import Follow
from .serializers import FollowUserSerializer
from rest_framework.generics import ListAPIView
from notifications.models import Notification


class FollowToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        target_user = get_object_or_404(User, id=user_id)

        if request.user == target_user:
            return Response(
                {"error": "You cannot follow yourself"},
                status=400
            )

        follow = Follow.objects.filter(
            follower=request.user,
            following=target_user
        ).first()

        if follow:
            follow.delete()
            return Response({"following": False})

        Follow.objects.create(
            follower=request.user,
            following=target_user
        )

        Notification.objects.create(
            sender=request.user,
            receiver=target_user,
            notification_type='FOLLOW'
        )

        return Response({"following": True})


class IsFollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        is_following = Follow.objects.filter(
            follower=request.user,
            following_id=user_id
        ).exists()

        return Response({"is_following": is_following})


class FollowersListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowUserSerializer

    def get_queryset(self):
        return User.objects.filter(
            following__following_id=self.kwargs['user_id'],    is_active=True

        ).distinct()
    

class FollowingListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowUserSerializer

    def get_queryset(self):
        return User.objects.filter(
            followers__follower_id=self.kwargs['user_id'],    is_active=True

        ).distinct()

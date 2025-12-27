from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializers import CommentSerializer

class AddCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            post_id=self.kwargs['post_id']
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

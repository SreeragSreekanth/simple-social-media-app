from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostCreateSerializer, PostListSerializer
from rest_framework.response import Response
from rest_framework import status


class PostCreateView(CreateAPIView):
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        post = serializer.instance 

        response_serializer = PostListSerializer(
            post,
            context={'request': request}
        )
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class FeedView(ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.select_related('user').prefetch_related('likes').all()
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request 
        return context
    


class MyPostsView(ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.select_related('user').prefetch_related('likes').filter(user=self.request.user)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request 
        return context
    

class PostDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)

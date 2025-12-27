from rest_framework import serializers
from .models import Post

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'image', 'caption']


class PostListSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    profile_pic = serializers.ImageField(source='user.profile_pic', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    liked_by_user = serializers.SerializerMethodField()
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)



    class Meta:
        model = Post
        fields = [
            'id',
            'user_id',
            'full_name',
            'profile_pic',
            'image',
            'caption',
            'likes_count',
            'liked_by_user',
            'comments_count',
            'created_at'
        ]

    def get_liked_by_user(self, obj):
        user = self.context.get('request').user
        if user.is_anonymous:
            return False
        return obj.likes.filter(user=user).exists()



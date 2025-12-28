from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_id = serializers.IntegerField(source='sender.id', read_only=True)
    sender_name = serializers.CharField(source='sender.full_name', read_only=True)
    sender_pic = serializers.ImageField(source='sender.profile_pic', read_only=True)

    class Meta:
        model = Notification
        fields = [
            'id',
            'sender_id',
            'sender_name',
            'sender_pic',
            'notification_type',
            'post_id',
            'is_read',
            'text',
            'created_at'
        ]

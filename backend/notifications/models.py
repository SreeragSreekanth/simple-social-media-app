from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('LIKE', 'Like'),
        ('COMMENT', 'Comment'),
        ('FOLLOW', 'Follow'),
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_notifications'
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications'
    )
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    post_id = models.IntegerField(null=True, blank=True)  
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=255, blank=True, null=True)


    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.notification_type} → {self.receiver}"

    def save(self, *args, **kwargs):
        # Auto-generate text if not provided
        if not self.text:
            sender_name = getattr(self.sender, 'full_name', str(self.sender))
            if self.notification_type == 'LIKE':
                self.text = f"{sender_name} liked your post"
            elif self.notification_type == 'COMMENT':
                self.text = f"{sender_name} commented on your post"
            elif self.notification_type == 'FOLLOW':
                self.text = f"{sender_name} started following you"
        super().save(*args, **kwargs)
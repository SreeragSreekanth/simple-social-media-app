from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='following'
    )
    following = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='followers'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
        models.UniqueConstraint(
            fields=['follower', 'following'],
            name='unique_follow'
        )
    ]

    def __str__(self):
        return f"{self.follower} follows {self.following}"

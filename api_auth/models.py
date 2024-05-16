from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class SpotifyToken(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='spotify_token')
    access_token = models.CharField(max_length=255)
    token_type = models.CharField(max_length=255)
    last_refreshed = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField()
    refresh_token = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.owner}'s access token"

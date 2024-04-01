from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField

User = get_user_model()

class Playlist(models.Model):
    PLAYLIST_TYPE = (
        ('p', 'Playlist'),
        ('a', 'Album'),
    )

    spotify_id = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    image = models.URLField(max_length=255)
    genres = ArrayField(models.CharField(max_length=255), blank=True, default=list)
    type = models.CharField(max_length=1, choices=PLAYLIST_TYPE)
    added_on = models.DateTimeField(auto_now_add=True)
    total_tracks = models.IntegerField()
    duration = models.BigIntegerField()
    external_url = models.URLField(max_length=255)

    class Meta:
        ordering = ['-added_on']

    def __str__(self):
        return f'{self.name}'

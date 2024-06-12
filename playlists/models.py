from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

class Playlist(models.Model):
    PLAYLIST_TYPE = (
        ('p', 'Playlist'),
        ('a', 'Album'),
    )

    spotify_id = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    season = models.ForeignKey('seasons.Season', on_delete=models.CASCADE, related_name='playlists')
    name = models.CharField(max_length=255)
    image = models.URLField(max_length=255)
    type = models.CharField(max_length=1, choices=PLAYLIST_TYPE)
    added_on = models.DateTimeField(auto_now_add=True)
    total_tracks = models.PositiveIntegerField()
    duration = models.PositiveBigIntegerField()
    external_url = models.URLField(max_length=255)

    class Meta:
        ordering = ['-added_on']
        constraints = [
            models.UniqueConstraint(fields=['owner', 'season'], name='unique_season_playlist_per_user')
        ]

    # Allows updates, while restricting the user to one playlist per season
    def save(self, *args, **kwargs):
        if Playlist.objects.filter(owner=self.owner, season=self.season).exclude(pk=self.pk).exists():
            raise ValidationError('You can only submit one playlist per season')
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'

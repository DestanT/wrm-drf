from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from playlists.models import Playlist

User = get_user_model()

class Rating(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='ratings')
    score = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['owner', 'playlist'], name='unique_rating_per_user_per_playlist')
        ]

    # Allows updates, while restricting the user to one rating per playlist
    def save(self, *args, **kwargs):
        if Rating.objects.filter(owner=self.owner, playlist=self.playlist).exclude(pk=self.pk).exists():
            raise ValidationError('You can only rate a playlist once')
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.owner} rated {self.playlist} a {self.score}'

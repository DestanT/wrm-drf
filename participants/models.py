from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from seasons.models import Season

User = get_user_model()

class SeasonParticipant(models.Model):
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['season', 'user'], name='unique_user_in_season')
        ]

    def save(self, *args, **kwargs):
        if self.user in self.season.participants.all():
            raise ValidationError('User is already participating in this season')
        if self.season.ended_on is not None:
            raise ValidationError('Season has already ended, cannot add participants')
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user} participated in "{self.season}"'

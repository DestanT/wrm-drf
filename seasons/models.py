from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()

class Season(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    participants = models.ManyToManyField(
        User,
        through='SeasonParticipant',
        through_fields=('season', 'user')
    )
    created_on = models.DateTimeField(auto_now_add=True)
    ended_on = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f'{self.name}'


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

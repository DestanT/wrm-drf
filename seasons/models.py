from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Season(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    participants = models.ManyToManyField(User, through='SeasonParticipant', through_fields=('season', 'user'))
    created_on = models.DateTimeField(auto_now_add=True)
    ended_on = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return f"{self.name}"

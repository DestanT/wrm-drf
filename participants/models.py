from django.db import models
from django.contrib.auth import get_user_model
from seasons.models import Season

User = get_user_model()

class SeasonParticipant(models.Model):
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'season')

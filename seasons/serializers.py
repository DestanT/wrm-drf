from rest_framework import serializers
from .models import Season


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = [
            'id', 'name', 'description', 'participants',
            'created_on', 'ended_on',
        ]

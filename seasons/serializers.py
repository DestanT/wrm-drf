from django.db import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Season, SeasonParticipant


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = [
            'id', 'name', 'description', 'participants',
            'created_on', 'ended_on',
        ]

class SeasonParticipantSerializer(serializers.ModelSerializer):
    season = serializers.ReadOnlyField(source='season.name')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = SeasonParticipant
        fields = ['id', 'season', 'user', 'joined_on']

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError({
                'detail': 'User is already participating in this season'
            }) from exc
        except ValidationError as exc:
            raise serializers.ValidationError({
                'detail': 'Season has already ended, cannot add participants'
            }) from exc

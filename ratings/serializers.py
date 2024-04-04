from django.db import IntegrityError
from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    playlist_owner = serializers.ReadOnlyField(
        source='playlist.owner.username'
    )
    is_owner = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_created_at(self, obj):
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        return naturaltime(obj.updated_at)

    class Meta:
        model = Rating
        fields = [
            'id', 'owner', 'playlist', 'playlist_owner',
            'is_owner', 'score', 'created_at', 'updated_at',
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError as exc:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            }) from exc


class RatingDetailSerializer(RatingSerializer):
    playlist = serializers.ReadOnlyField(source='playlist.id')

from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import SpotifyToken


class SpotifyTokenSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    last_refreshed = serializers.SerializerMethodField()
    expires_at = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_last_refreshed(self, obj):
        return naturaltime(obj.created_at)

    def get_expires_at(self, obj):
        return naturaltime(obj.expires_at)

    class Meta:
        model = SpotifyToken
        fields = [
            'id', 'owner', 'is_owner', 'access_token', 'token_type',
            'last_refreshed', 'expires_at', 'refresh_token'
        ]

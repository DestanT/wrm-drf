from rest_framework import serializers
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Playlist
        fields = [
            'id', 'spotify_id', 'owner', 'is_owner',
            'name', 'image', 'type', 'added_on',
            'total_tracks', 'duration', 'external_url',
        ]

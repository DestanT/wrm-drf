from rest_framework import serializers
from ratings.models import Rating
from .models import Playlist


class PlaylistSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    is_owner = serializers.SerializerMethodField()
    rating_id = serializers.SerializerMethodField()
    owner_rating = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_rating_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            rating = Rating.objects.filter(owner=user, playlist=obj).first()
            return rating.pk if rating else None
        return None

    def get_owner_rating(self, obj):
        rating = Rating.objects.filter(owner=obj.owner, playlist=obj).first()
        return rating.score if rating else None

    class Meta:
        model = Playlist
        fields = [
            'id', 'spotify_id', 'owner', 'owner_id', 'is_owner',
            'name', 'image', 'type', 'added_on',
            'total_tracks', 'duration', 'external_url',
            'rating_id', 'owner_rating',
        ]

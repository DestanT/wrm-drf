from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def validate_image(self, value):
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError('Image cannot be larger than 2MB')
        if value.image.width > 4096:
            raise serializers.ValidationError('Image width cannot be larger than 4096px')
        if value.image.height > 4096:
            raise serializers.ValidationError('Image height cannot be larger than 4096px')
        return value

    class Meta:
        model = Profile
        fields = ['id', 'owner', 'is_owner', 'created_at', 'image']

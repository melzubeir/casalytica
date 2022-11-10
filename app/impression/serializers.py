"""
serializers for impression api
"""
from rest_framework import serializers
from impression.models import (
    Impression
)


class ImpressionSerializer(serializers.ModelSerializer):
    """serializer for impression model"""
    class Meta:
        model = Impression
        fields = [
            'id', 'created', 'post_hash', 'is_deso',
        ]
        read_only_fields = ['-created']

class ImpressionDetailSerializer(ImpressionSerializer):
    """Serializer for impression detail view"""

    class Meta(ImpressionSerializer.Meta):
        fields = ImpressionSerializer.Meta.fields + [
            'source_app', 'referer', 'remote_addr', 'user_agent',
            'device_type', 'browser_type', 'browser_version', 'os_type',
            'os_version', 'city', 'country', 'latitude', 'longitude',
            'tz',
        ]

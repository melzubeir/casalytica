"""
serializers for analytics api
"""
from rest_framework import serializers
from .models import (
    Impression
)


class ImpressionSerializer(serializers.ModelSerializer):
    """serializer for impression model

    sample payload:
    {
        "post_hash": "3151efdf499e5220241b48040fc9500970f4aaa6f512daa0b88be7b3f200c339",
        "source_app": 1,
        "remote_addr": "4.2.2.1",
        "referer": "https://www.google.com/",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    }
    """
    class Meta:
        model = Impression
        fields = [
            'id', 'created', 'post_hash', 'is_deso',
            'remote_addr', 'user_agent', 'referer',
            'source_app',
        ]
        read_only_fields = ['created']

    def create(self, validated_data):
        """create a new impression"""

        auth_user = self.context['request'].user
        impression = Impression.objects.create(
            **validated_data, user=auth_user)

        impression.post_hash = validated_data.pop('post_hash', None)

        impression.remote_addr = validated_data.pop('remote_addr', None)
        impression.user_agent = validated_data.pop('user_agent', None)
        impression.referer = validated_data.pop('referer', None)
        impression.source_app = validated_data.pop('source_app', None)

        # maybe spend some time validating data? lol
        return impression


    def update(self, instance, validated_data):
        """update impression"""

        # i get the feeling no one should be able to do that?
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ImpressionDetailSerializer(ImpressionSerializer):
    """Serializer for impression detail view"""

    class Meta(ImpressionSerializer.Meta):
        fields = ImpressionSerializer.Meta.fields + [
            'device_brand', 'device_family', 'device_model',
            'browser_family', 'browser_version',
            'os_family', 'os_version',
            'city', 'country', 'latitude', 'longitude',
            'tz',
        ]

"""
serializers for impression api
"""
from rest_framework import serializers
from impression.models import (
    Impression
)
from django.contrib.gis.geoip2 import GeoIP2


class ImpressionSerializer(serializers.ModelSerializer):
    """serializer for impression model"""
    class Meta:
        model = Impression
        fields = [
            'id', 'created', 'post_hash', 'is_deso',
        ]
        read_only_fields = ['-created']

    def create(self, validated_data):
        """create a new impression"""

        auth_user = self.context['request'].user
        impression = Impression.objects.create(
            **validated_data, user=auth_user)
        remote_addr = validated_data.pop('remote_addr', None)
        self.user_agent = validated_data.pop('user_agent', None)

        location = self.get_location(remote_addr)
        if location:
            impression.city = location['city'] if True else 'unknown'
            impression.country = location['country_name'] if True else 'unknown'
            impression.latitude = location['latitude'] if True else 0
            impression.longitude = location['longitude'] if True else 0
            impression.tz = location['time_zone'] if True else 'unknown'

        self.referer = validated_data.pop('referer', None)
        self.device_type = validated_data.pop('device_type', None)
        self.os_type = validated_data.pop('os_type', None)
        self.os_version = validated_data.pop('os_version', None)
        self.broser_type = validated_data.pop('browser_type', None)

        # maybe spend some time validating data? lol
        return impression

    def get_location(self, ip=None):
        """get location from ip address"""
        g = GeoIP2()
        try:
            loc = g.city(ip)
        except:
            return False

        return loc

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
            'source_app', 'referer', 'remote_addr', 'user_agent',
            'device_type', 'browser_type', 'browser_version', 'os_type',
            'os_version', 'city', 'country', 'latitude', 'longitude',
            'tz',
        ]

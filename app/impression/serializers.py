"""
serializers for impression api
"""
from rest_framework import serializers
from user_agents import parse
from impression.models import (
    Impression
)
from django.contrib.gis.geoip2 import GeoIP2


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

        self.remote_addr = validated_data.pop('remote_addr', None)
        self.user_agent = validated_data.pop('user_agent', None)
        self.referer = validated_data.pop('referer', None)
        self.source_app = validated_data.pop('source_app', None)

        location = self.get_location(self.remote_addr)
        if location:
            impression.city = location['city'] if True else 'unknown'
            impression.country = location['country_name'] if True else 'unknown'
            impression.latitude = location['latitude'] if True else 0
            impression.longitude = location['longitude'] if True else 0
            impression.tz = location['time_zone'] if True else 'unknown'

        if self.user_agent:
            ua = parse(self.user_agent)
            impression.device_brand = ua.device.brand
            impression.device_family = ua.device.family
            impression.device_model = ua.device.model
            impression.os_family = ua.os.family
            impression.os_version = ua.os.version_string
            impression.browser_family = ua.browser.family
            impression.browser_version = ua.browser.version_string

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
            'device_brand', 'device_family', 'device_model',
            'browser_family', 'browser_version',
            'os_family', 'os_version',
            'city', 'country', 'latitude', 'longitude',
            'tz',
        ]

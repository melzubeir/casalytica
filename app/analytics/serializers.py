"""
serializers for analytics api
"""
from rest_framework import serializers
from analytics import models
import logging
import ipaddress
from django.db.models import F
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.geoip2 import GeoIP2
from user_agents import parse


logger = logging.getLogger(__name__)


class PostSerializer(serializers.ModelSerializer):
    """Serializer for post model"""

    class Meta:
        model = models.Post
        fields = [
            'post_hash', 'impressions_total', 'likes_total',
            'diamonds_total', 'comments_total', 'reposts_total',
            'creator', 'node'
        ]
        read_only_fields = [
            'impressions_total', 'likes_total', 'diamonds_total',
            'comments_total', 'reposts_total',
        ]

    def _get_or_create_creator(self, username, public_key_base58):
        """get or create creator"""
        logger.info('PostSerializer._get_or_create_creator() ----> ENTRY <----')

        creator_obj, created = models.Creator.objects.get_or_create(
            username=username,
            public_key_base58=public_key_base58)
        creator_obj.save()
        return creator_obj

    def _get_or_create_node(self, node_id):
        """get or create creator"""
        logger.info('PostSerializer._get_or_create_node() ----> ENTRY <----')
        node_obj, created = models.Node.objects.get_or_create(
            id=node_id)
        node_obj.save()
        return node_obj

    def update(self, post_data):
        """update post"""
        logger.info('PostSerializer.update() ----> ENTRY <----')
        post_obj = models.Post.objects.get(post_hash=post_data['post_hash'])
        post_obj.impressions_total = F('impressions_total') + 1

    def create(self, post_data):
        """create post"""
        logger.info('PostSerializer.create() ----> ENTRY <----')
        creator = self._get_or_create_creator(
            post_data['creator'][0], post_data['creator'][1])
        node = self._get_or_create_node(post_data['node'])

        post_obj, created = models.Post.objects.get_or_create(
            post_hash=post_data['post_hash'], creator=creator, node=node)

        post_obj.likes_total = post_data['likes_total']
        post_obj.diamonds_total = post_data['diamonds_total']
        post_obj.comments_total = post_data['comments_total']
        post_obj.reposts_total = post_data['reposts_total']
        post_obj.creator = creator
        post_obj.node = node
        post_obj.impressions_total = F('impressions_total') + 1

        logger.info('PostSerializer.create() post_obj: %s', post_obj)
        post_obj.save()


class ImpressionSerializer(serializers.Serializer):
    """serializer for impression model"""

    class Meta:
        model = models.Impression
        fields = [
            'created', 'posts', 'remote_addr', 'user_agent', 'referer',
            'source_app', 'is_deso',
        ]
        read_only_fields = ['created']

    def get_fields(self):
        """get fields"""
        fields = super().get_fields()
        fields['source_app'] = serializers.SerializerMethodField()
        fields['is_deso'] = serializers.BooleanField()
        fields['posts'] = PostSerializer(many=True, required=False)
        fields['remote_addr'] = serializers.IPAddressField()
        fields['user_agent'] = serializers.CharField()
        fields['user'] = serializers.CharField(required=True)
        fields['referer'] = serializers.CharField(required=False)
        return fields

    def _set_location(self, ip, instance):
        """set location metadata from ip address"""
        g = GeoIP2()
        try:
            location = g.city(ip)
        except:
            logger.critical(
                'ImpressionViewSet._set_location(): error getting location from ip: ' + location)
            return False

        if location:
            instance.city = location['city'] if True else 'unknown'
            instance.country = location['country_name'] if True else 'unknown'
            instance.latitude = location['latitude'] if True else 0
            instance.longitude = location['longitude'] if True else 0
            instance.tz = location['time_zone'] if True else 'unknown'

        instance.save()

    def _set_agent(self, agent, instance):
        """set agent metadata from user agent"""

        ua = parse(agent)
        instance.device_brand = ua.device.brand
        instance.device_family = ua.device.family
        instance.device_model = ua.device.model
        instance.os_family = ua.os.family
        instance.os_version = ua.os.version_string
        instance.browser_family = ua.browser.family
        instance.browser_version = ua.browser.version_string

        instance.save()

    def to_internal_value(self, data):
        """convert data to internal value"""
        logger.info(
            'ImpressionSerializer.to_internal_value() ----> ENTRY <----\n\t\tdata: %s', data)
        auth_user = self.context['request'].user

        values = {
            'remote_addr': data.get('remote_addr', None),
            'posts': data.get('posts', None),
            'user_agent': data.get('user_agent', None),
            'source_app': data.get('source_app', None),
            'is_deso': data.get('is_deso', True),
            'referer': data.get('referer', None),
            'user': auth_user
        }
        logger.info(
            'ImpressionSerializer.to_internal_value() values: %s', values)
        return values

    def to_representation(self, instance):
        """convert to representation"""
        logger.info(
            'ImpressionSerializer.to_representation() ----> ENTRY <----')
        return {
            'created': instance.created,
            'remote_addr': instance.remote_addr,
            'referer': instance.referer,
            'user_agent': instance.user_agent,
            'source_app': instance.source_app,
            'is_deso': instance.is_deso,
            'posts': instance.posts.all(),
        }

    def create(self, validated_data):
        """create impression"""
        logger.info('ImpressionSerializer.create() ----> ENTRY <----')
        instance = models.Impression.objects.create(
            remote_addr=validated_data['remote_addr'],
            user_agent=validated_data['user_agent'],
            source_app=validated_data['source_app'],
            referer=validated_data['referer'],
            is_deso=validated_data['is_deso'],
            user=validated_data['user'],
        )

        self._get_or_create_posts(validated_data['posts'])

        self._set_location(validated_data['remote_addr'], instance)
        self._set_agent(validated_data['user_agent'], instance)
        instance.save()

        return instance

    def validate_remote_addr(self, remote_addr):
        """validate remote_addr"""
        logger.info(
            'ImpressionSerializer.validate_remote_addr() ----> ENTRY <----')
        if remote_addr is None:
            raise serializers.ValidationError(_('remote_addr is required'))
        if (ipaddress.ip_address(remote_addr).is_private or
                ipaddress.ip_address(remote_addr).is_loopback):
            raise serializers.ValidationError(_('remote_addr is invalid'))
        return remote_addr

    def _get_or_create_posts(self, posts):
        """handle getting or create posts for impression"""

        logger.info(
            'ImpressionViewset._get_or_create_posts() ----> ENTRY <----')
        post_objects = []
        for post in posts:
            logger.info(
                'ImpressionViewset._get_or_create_posts() - posts loop top / post: %s', post)
            post_data = {
                'post_hash': post['post_hash'],
                'likes_total': 0,
                'diamonds_total': 0,
                'comments_total': 0,
                'reposts_total': 0,
                'creator': {
                    'username': 'unknown',
                    'key': 'unknown'
                },
                'node': 1
            }
            creator = self._get_or_create_creator(
                post_data['creator'])
            node = self._get_or_create_node(post_data['node'])
            post_obj, created = models.Post.objects.get_or_create(
                post_hash=post['post_hash'])
            if not created:
                logger.info(
                    'ImpressionViewset._get_or_create_posts() - Post exists NOT CREATED: %s', post_obj)
            post_obj.creator = creator
            post_obj.node = node
            post_obj.impressions_total = F('impressions_total') + 1
            post_obj.save()
            post_objects.append(post_obj)
            logger.info(
                'ImpressionViewset._get_or_create_posts() - posts loop bottom - post_obj: %s', post_obj)

        return post_objects

    def _get_or_create_creator(self, creator):
        """get or create creator"""

        logger.info(
            'ImpressionViewset._get_or_create_creator() ----> ENTRY <----')
        creator_obj, created = models.Creator.objects.get_or_create(
            username=creator['username'],
            public_key_base58=creator['key'])
        creator_obj.save()
        return creator_obj

    def _get_or_create_node(self, node_id):
        """get or create creator"""

        logger.info('ImpressionViewset._get_or_create_node() ----> ENTRY <----')
        node_obj, created = models.Node.objects.get_or_create(
            id=node_id)
        node_obj.save()
        return node_obj


class ImpressionDetailSerializer(ImpressionSerializer):
    """Serializer for impression detail view"""
    # posts = PostSerializer(many=True, required=False)

    class Meta(ImpressionSerializer.Meta):
        fields = ImpressionSerializer.Meta.fields + [
            'device_brand', 'device_family', 'device_model',
            'browser_family', 'browser_version',
            'os_family', 'os_version',
            'city', 'country', 'latitude', 'longitude',
            'tz',
        ]
        read_only_fields = [
            'device_brand', 'device_family', 'device_model',
            'browser_family', 'browser_version',
            'os_family', 'os_version',
            'city', 'country', 'latitude', 'longitude',
            'tz',
        ]


class CreatorSerializer(serializers.ModelSerializer):
    """Serializer for creator model"""

    class Meta:
        model = models.Creator
        fields = [
            'username', 'public_key_base58'
        ]
        read_only_fields = fields


class NodeSerializer(serializers.ModelSerializer):
    """Serializer for node model"""

    class Meta:
        model = models.Node
        fields = [
            'name', 'url', 'owner'
        ]
        read_only_fields = fields

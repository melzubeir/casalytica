"""
serializers for analytics api
"""
from rest_framework import serializers
from analytics import models
from django.db.models import F
from config.settings import (
    logger,
    nodeURL
)
from django.contrib.gis.geoip2 import GeoIP2
from user_agents import parse

from deso import Posts


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
        creator_obj, created = models.Creator.objects.get_or_create(
            username=username,
            public_key_base58=public_key_base58)
        creator_obj.save()
        return creator_obj

    def _get_or_create_node(self, node_id):
        """get or create creator"""
        node_obj, created = models.Node.objects.get_or_create(
            id=node_id)
        node_obj.save()
        return node_obj


    def create(self, post_data):
        """create post"""
        creator = self._get_or_create_creator(
            post_data['creator'][0], post_data['creator'][1])
        node = self._get_or_create_node(post_data['node'])
        post_obj, created = models.Post.objects.get_or_create(
            post_hash=post_data['post_hash'], creator=creator, node=node)

        post_obj.likes_total = post_data['likes_total']
        post_obj.diamonds_total = post_data['diamonds_total']
        post_obj.comments_total = post_data['comments_total']
        post_obj.reposts_total = post_data['reposts_total']
        post_obj.creator=creator
        post_obj.node=node
        post_obj.impressions_total = F('impressions_total') + 1

        logger.info('PostSerializer.create() post_obj: %s', post_obj)
        post_obj.save()




class ImpressionSerializer(serializers.ModelSerializer):
    """serializer for impression model

    sample payload:
    {
        "posts": [
           {
             "post_hash": "3151efdf499e5220241b48040fc9500970f4aaa6f512daa0b88be7b3f200c339"
           }, {
             "post_hash": "14fafdebff6610c2b0c2cca2b5ec901949e1f98c5bccbb72450b01cfd3c35228" }
         ],
        "source_app": 1,
        "remote_addr": "4.2.2.1",
        "referer": "https://www.google.com/",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    }
    """
    class Meta:
        model = models.Impression
        fields = [
            'created', 'posts', 'remote_addr', 'user_agent', 'referer',
            'source_app', 'is_deso',
        ]
        read_only_fields = ['created']

    def _get_or_create_creator(self, creator):
        """get or create creator"""
        creator_obj, created = models.Creator.objects.get_or_create(
            username=creator['username'],
            public_key_base58=creator['key'])
        creator_obj.save()
        return creator_obj

    def _get_or_create_node(self, node_id):
        """get or create creator"""
        node_obj, created = models.Node.objects.get_or_create(
            id=node_id)
        node_obj.save()
        return node_obj

    def _get_post_data(self, post_hash):
        """get post data from deso"""
        desoPost = Posts(nodeURL=nodeURL)
        p = {}

        try:
            sPost = desoPost.getSinglePost(post_hash).json()
        except:
            logger.critical("Error getting post data from deso")
            return p

        try:
            if 'PostFound' in sPost:
                if 'Node' in sPost['PostFound']['PostExtraData']:
                    n = sPost['PostFound']['PostExtraData']['Node']
                else:
                    n = 1
                p = {
                    'post_hash': post_hash,
                    'likes_total': sPost['PostFound']['LikeCount'],
                    'diamonds_total': sPost['PostFound']['DiamondCount'],
                    'comments_total': sPost['PostFound']['CommentCount'],
                    'reposts_total': sPost['PostFound']['RepostCount'],
                    'creator': {
                        'username': sPost['PostFound']['ProfileEntryResponse']['Username'],
                        'key': sPost['PostFound']['ProfileEntryResponse']['PublicKeyBase58Check']
                    },
                    'node' : n
                }
        except:
            logger.error('error getting post from deso')
            return False
        logger.info('post data from deso: %s', p)
        return p

    def _get_or_create_posts(self, posts):
        """handle getting or create posts for impression"""
        for post in posts:
            post_data = self._get_post_data(post['post_hash'])
            if post_data:
                creator = self._get_or_create_creator(
                    post_data['creator'])
                node = self._get_or_create_node(post_data['node'])
                post_obj, created = models.Post.objects.get_or_create(
                    post_hash=post['post_hash'], creator=creator, node=node)
                post_obj.likes_total = post_data['likes_total']
                post_obj.diamonds_total = post_data['diamonds_total']
                post_obj.comments_total = post_data['comments_total']
                post_obj.reposts_total = post_data['reposts_total']
                post_obj.creator=creator
                post_obj.node=node
                post_obj.impressions_total = F('impressions_total') + 1
                post_obj.save()
                logger.info('ImpressionSerializer._get_or_create_posts() post_obj: %s', post_obj)
                self.impression.posts.add(post_obj)
            else:
                return False
        return True

    def get_location(self, ip=None):
        """get location from ip address"""
        g = GeoIP2()
        try:
            loc = g.city(ip)
        except:
            return False

        return loc

    def get_source_app(self):
        return models.Impression.DESO_APP_CHOICES[self.source_app - 1][1]

    def create(self, validated_data):
        """create a new impression"""
        logger.info('create() validated_data: %s', validated_data)
        auth_user = self.context['request'].user
        posts = validated_data.pop('posts')

        self.impression = models.Impression.objects.create(
            **validated_data, user=auth_user)

        self.impression.remote_addr = validated_data.pop('remote_addr', None)
        self.impression.user_agent = validated_data.pop('user_agent', None)
        self.impression.referer = validated_data.pop('referer', None)
        self.impression.source_app = validated_data.pop('source_app', None)


        if self._get_or_create_posts(posts):
            location = self.get_location(self.impression.remote_addr)
            if location:
                self.impression.city = location['city'] if True else 'unknown'
                self.impression.country = location['country_name'] if True else 'unknown'
                self.impression.latitude = location['latitude'] if True else 0
                self.impression.longitude = location['longitude'] if True else 0
                self.impression.tz = location['time_zone'] if True else 'unknown'

            if self.impression.user_agent:
                ua = parse(self.impression.user_agent)
                self.impression.device_brand = ua.device.brand
                self.impression.device_family = ua.device.family
                self.impression.device_model = ua.device.model
                self.impression.os_family = ua.os.family
                self.impression.os_version = ua.os.version_string
                self.impression.browser_family = ua.browser.family
                self.impression.browser_version = ua.browser.version_string
        else:
            return False
        self.impression.save()
        return self.impression

    def update(self, instance, validated_data):
        """update impression"""

        # i get the feeling no one should be able to do that?
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ImpressionDetailSerializer(ImpressionSerializer):
    """Serializer for impression detail view"""
    posts = PostSerializer(many=True, required=False)

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

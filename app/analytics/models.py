from django.db import models
from config import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.geoip2 import GeoIP2
from user_agents import parse

from deso import Posts


DESO_APP_CHOICES = [
    (0, ('Undefined')),
    (1, ('Diamond')),
    (2, ('Desofy')),
    (3, ('Entre')),
]


class Creator(models.Model):
    """Model for creators"""
    username = models.CharField(max_length=255)
    public_key_base58 = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Node(models.Model):
    """Model for deso nodes
    Nodes are the servers that run the deso blockchain
    and can be queried:
        POST /api/v0/get-app-state

    probably worth populating the local db with the most up-to-date list
    and periodically updating it
    """

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    owner = models.ForeignKey(
        Creator,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Post(models.Model):
    """Model for posts"""

    post_hash = models.CharField(max_length=255)
    impressions_total = models.IntegerField(default=0)
    likes_total = models.IntegerField(default=0)
    diamonds_total = models.IntegerField(default=0)
    comments_total = models.IntegerField(default=0)
    reposts_total = models.IntegerField(default=0)
    node = models.ForeignKey(
        Node,
        on_delete=models.CASCADE,
    )
    creator = models.ForeignKey(
        Creator,
        on_delete=models.CASCADE,
    )

    def _get_or_create_creator(self, username, public_key_base58):
        """get or create creator"""
        creator_obj, created = Creator.objects.get_or_create(
            username=username,
            public_key_base58=public_key_base58)
        creator_obj.save()
        return creator_obj

    def _get_or_create_node(self, node_id):
        """get or create creator"""
        node_obj, created = Node.objects.get_or_create(
            id=node_id)
        node_obj.save()
        return node_obj

    def save(self, *args, **kwargs):
        """Override Post save method to update post data from deso"""
        desoPost = Posts()

        # this is a very slow call and needs to be refactored
        sPost = desoPost.getSinglePost(self.post_hash).json()

        if sPost['PostFound']:
            self.likes_total = sPost['PostFound']['LikeCount']
            self.diamonds_total = sPost['PostFound']['DiamondCount']
            self.comments_total = sPost['PostFound']['CommentCount']
            self.reposts_total = sPost['PostFound']['RepostCount']
            self.creator = self._get_or_create_creator(
                sPost['PostFound']['ProfileEntryResponse']['Username'],
                sPost['PostFound']['ProfileEntryResponse']['PublicKeyBase58Check']
            )
            if 'Node' in sPost['PostFound']['PostExtraData']:
                self.node = self._get_or_create_node(
                    sPost['PostFound']['PostExtraData']['Node']
                )

        super().save(*args, **kwargs)

    def __str__(self):
        return self.post_hash


class Impression(models.Model):
    """Model for the impression"""

    class Meta:
        ordering = ["-created"]

    # required fields
    post_hash = models.CharField(max_length=255)
    source_app = models.IntegerField(choices=DESO_APP_CHOICES, default=0)
    created = models.DateTimeField(auto_now_add=True)

    # optional but highly recommended
    remote_addr = models.GenericIPAddressField(
        protocol='both', unpack_ipv4=True, null=True)

    # optional
    user_agent = models.CharField(max_length=255, null=True)
    referer = models.CharField(max_length=255, null=True)
    creator_handle = models.CharField(max_length=255, null=True, blank=True)

    # generated from the above inputs
    device_family = models.CharField(max_length=255, null=True)
    device_brand = models.CharField(max_length=255, null=True)
    device_model = models.CharField(max_length=255, null=True)
    browser_family = models.CharField(max_length=255, null=True)
    browser_version = models.CharField(max_length=14, null=True)
    os_family = models.CharField(max_length=255, null=True)
    os_version = models.CharField(max_length=14, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    latitude = models.DecimalField(max_digits=5, decimal_places=3, null=True)
    longitude = models.DecimalField(max_digits=5, decimal_places=3, null=True)
    tz = models.CharField(max_length=255, null=True)

    is_deso = models.BooleanField(default=True)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )

    def _get_or_create_post(self, post):
        """get or create post"""
        if post:
            post_obj, created = Post.objects.get_or_create(
                post_hash=post)
        post_obj.impressions_total = models.F('impressions_total') + 1
        post_obj.save()
        return post_obj

    def get_source_app(self):
        return DESO_APP_CHOICES[self.source_app - 1][1]

    def get_location(self, ip=None):
        """get location from ip address"""
        g = GeoIP2()
        try:
            loc = g.city(ip)
        except:
            return False

        return loc

    def save(self, *args, **kwargs):
        """save the impression with location and user agent meta data expansion"""
        self.post = self._get_or_create_post(self.post_hash)

        location = self.get_location(self.remote_addr)
        if location:
            self.city = location['city'] if True else 'unknown'
            self.country = location['country_name'] if True else 'unknown'
            self.latitude = location['latitude'] if True else 0
            self.longitude = location['longitude'] if True else 0
            self.tz = location['time_zone'] if True else 'unknown'

        if self.user_agent:
            ua = parse(self.user_agent)
            self.device_brand = ua.device.brand
            self.device_family = ua.device.family
            self.device_model = ua.device.model
            self.os_family = ua.os.family
            self.os_version = ua.os.version_string
            self.browser_family = ua.browser.family
            self.browser_version = ua.browser.version_string

        super(Impression, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.created)
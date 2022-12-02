from django.db import models
import json
from config import settings
from django.utils.translation import gettext_lazy as _
from config import settings


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
    profile_image = models.URLField(max_length=255, null=True, blank=True)
    featured_image = models.URLField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

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


class OnChainApp(models.Model):
    """Model for apps serving on-chain content"""
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(
        Creator,
        on_delete=models.CASCADE,
        null=True,
        blank=True)
    node = models.ForeignKey(
        Node,
        on_delete=models.CASCADE,
        null=True,
        blank=True)
    url = models.URLField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    # if the app is published not null
    app_store_url = models.URLField(max_length=255, null=True, blank=True)
    google_store_url = models.URLField(max_length=255, null=True, blank=True)

    is_deso = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    is_claimed = models.BooleanField(default=False)


    def __str__(self):
        return self.name


class Post(models.Model):
    """Model for posts"""

    post_hash = models.SlugField(max_length=64,
                                 validators=[settings.HEXA_VALID],
                                 unique=True)
    impressions_total = models.IntegerField(default=0)
    likes_total = models.IntegerField(default=0)
    diamonds_total = models.IntegerField(default=0)
    comments_total = models.IntegerField(default=0)
    reposts_total = models.IntegerField(default=0)
    node = models.ForeignKey(
        Node,
        on_delete=models.CASCADE,
        blank=True,
        null=True

    )
    creator = models.ForeignKey(
        Creator,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

    def __str__(self):
        return self.post_hash


class Impression(models.Model):
    """Model for the impression"""

    class Meta:
        ordering = ["-created"]

    # required fields
    posts = models.ManyToManyField('Post', blank=True)
    created = models.DateTimeField(auto_now_add=True)

    source_app = models.ForeignKey(
        OnChainApp,
        on_delete=models.CASCADE,
        blank=True,
        null=True)

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

    def __str__(self):
        return str(self.created)

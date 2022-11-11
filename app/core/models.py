"""
core casalytica models
"""
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.db import models
from config import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.gis.geoip2 import GeoIP2
from user_agents import parse


DESO_APP_CHOICES = [
    (0, ('Undefined')),
    (1, ('Diamond')),
    (2, ('Desofy')),
    (3, ('Entre')),
]


class UserManager(BaseUserManager):
    """Manager for users"""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user"""
        if not email:
            raise ValueError(_('Users must have an email address'))
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Create, save and return a new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User is in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # replacing the default username field with email
    USERNAME_FIELD = 'email'


class Post(models.Model):
    """Model for posts"""

    post_hash = models.CharField(max_length=255)
    creator = models.CharField(max_length=255)
    impressions_total = models.IntegerField(default=0)
    likes_total = models.IntegerField(default=0)
    diamonds_total = models.IntegerField(default=0)
    comments_total = models.IntegerField(default=0)
    reposts_total = models.IntegerField(default=0)


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

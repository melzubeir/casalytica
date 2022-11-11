"""
Models for the impressions app.
"""
from django.db import models
from config import settings

DESO_APP_CHOICES = [
    (0, ('Undefined')),
    (1, ('Diamond')),
    (2, ('Desofy')),
    (3, ('Entre')),
]


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

    def get_source_app(self):
        return DESO_APP_CHOICES[self.source_app - 1][1]

    def __str__(self):
        return str(self.created)

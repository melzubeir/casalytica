"""
Models for the impressions app.
"""
from django.db import models

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

    post_hash = models.CharField(max_length=255)
    source_app = models.IntegerField(choices=DESO_APP_CHOICES, default=0)
    created = models.DateTimeField(auto_now_add=True)
    referer = models.CharField(max_length=255, null=True)
    remote_addr = models.GenericIPAddressField(
        protocol='both', unpack_ipv4=True, null=True)
    user_agent = models.CharField(max_length=255, null=True)

    device_type = models.CharField(max_length=255, null=True)
    browser_type = models.CharField(max_length=255, null=True)
    browser_version = models.CharField(max_length=255, null=True)
    os_type = models.CharField(max_length=255, null=True)
    os_version = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    latitude = models.DecimalField(max_digits=5, decimal_places=3, null=True)
    longitude = models.DecimalField(max_digits=5, decimal_places=3, null=True)
    tz = models.CharField(max_length=255, null=True)

    is_deso = models.BooleanField(default=False)



    def get_source_app(self):
        return DESO_APP_CHOICES[self.source_app - 1][1]

    def __str__(self):
        return str(self.remote_addr)

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
            raise ValueError('Users must have an email address')
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

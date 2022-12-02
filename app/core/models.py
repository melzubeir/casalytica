"""
core casalytica models
"""
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
import logging
from django.db import models
from django.utils.translation import gettext_lazy as _

from config import settings

logger = logging.getLogger(__name__)

class UserManager(BaseUserManager):
    """Manager for users"""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user"""
        if not email:
            raise ValueError(_('Users must have an email address'))
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        if settings.DEBUG:
            logger.info('User created: %s', user)
        return user

    def create_superuser(self, email, password):
        """Create, save and return a new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.is_reporter = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User is in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(
        'analytics.Creator',
        on_delete=models.CASCADE,
        null=True,
        blank=True)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_reporter = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # replacing the default username field with email
    USERNAME_FIELD = 'email'
    USER_MODEL_USERNAME_FIELD = None
    EMAIL_FIELD = 'email'

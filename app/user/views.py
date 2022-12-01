"""
Views for the user API
"""
from django.views import generic
from rest_framework import (
    generics,
    authentication,
    permissions,
)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from django.urls import reverse_lazy
import logging
from user.serializers import (
    UserSerializer,
    AuthTokenSerializer
)

from .forms import CustomUserCreationForm
from analytics import models
from config import settings


logger = logging.getLogger(__name__)


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

    def create(self, serializer):
        """Create a new user"""

        # create creator object for user
        creator_obj, created = models.Creator.objects.get_or_create(
            username=serializer.data.get('creator').get('username'),
            public_key_base58=serializer.data.get(
                'creator').get('public_key_base58'),
        )

        serializer.data['creator'] = creator_obj.pk
        if settings.DEBUG:
            logger.info("Creator object created: %s", creator_obj)
            logger.info('User data: %s', serializer.data)

        return super().create(serializer)


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user"""
        return self.request.user


class SignupPageView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'

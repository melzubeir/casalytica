"""
views for the impressions api
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework import (
    viewsets,

)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import (
    Impression
)
from analytics import serializers

@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'is_deso',
                OpenApiTypes.INT, enum=[0, 1],
                description='Filter by deso posts only',
            )
        ]
    )
)
class ImpressionViewSet(viewsets.ModelViewSet):
    """View to manage Impressions APIs"""
    serializer_class = serializers.ImpressionDetailSerializer
    queryset = Impression.objects.all()
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def _params_to_ints(self, qs):
        """Convert a list of strings to integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve impressions for a post"""
        queryset = self.queryset

        return queryset.filter(
            user=self.request.user
            ).order_by('-id').distinct()

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list':
            return serializers.ImpressionSerializer

        return self.serializer_class

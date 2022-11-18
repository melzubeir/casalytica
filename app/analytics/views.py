"""
views for the impressions api
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import (
    Impression,
    Post,
    Node,
    Creator,
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


    def get_source_app(self):
        return Impression.DESO_APP_CHOICES[self.source_app - 1][1]



@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'creator',
                OpenApiTypes.INT,
                description='Filter by creator',
            ),
            OpenApiParameter(
                'post_hash',
                OpenApiTypes.STR,
                description='Deso Post hash hex',
            ),

        ]
    )
)
class PostViewSet(viewsets.ModelViewSet):
    """View to manage post APIs"""
    serializer_class = serializers.PostSerializer
    queryset = Post.objects.all()
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'post_hash'


@extend_schema_view()
class NodeViewSet(viewsets.ModelViewSet):
    """View to manage node APIs"""
    serializer_class = serializers.NodeSerializer
    queryset = Node.objects.all()
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]


@extend_schema_view()
class CreatorViewSet(viewsets.ModelViewSet):
    """View to manage creator APIs"""
    serializer_class = serializers.CreatorSerializer
    queryset = Creator.objects.all()
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'username'

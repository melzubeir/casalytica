"""
views for the impressions api
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema_field,
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

    @extend_schema_field(OpenApiTypes.STR)
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
    """
    Posts are created on the deso blockchain and their impressions are being tracked
    by the analytics app. As a result, only posts that have reported impressions
    are available in the analytics app.

    Impressions totals are calculated by the analytics app and are not available on the deso blockchain.

    The following fields are available:
    - post_hash: the hex hash of the post
    - creator: the creator of the post
    - impressions_total: the number of impressions reported for this post
    - diamonds_total: the number of diamonds reported for this post
    - likes_total: the number of likes reported for this post
    - comments_total: the number of comments reported for this post
    - reposts_total: the number of reposts reported for this post
    - node: originating node where the post was created

    We can query a post by its creator and/or post hash.
    """
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

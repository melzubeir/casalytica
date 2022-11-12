"""
url mappings for the analytics api
"""
from django.urls import (
    path,
    include
)
from rest_framework.routers import DefaultRouter
from analytics import views

router = DefaultRouter()
router.register('impression', views.ImpressionViewSet)
router.register('posts', views.PostViewSet)
router.register('nodes', views.NodeViewSet)
router.register('creators', views.CreatorViewSet)

app_name = 'analytics'

urlpatterns = [
    path('', include(router.urls)),
]

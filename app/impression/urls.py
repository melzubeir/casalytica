"""
url mappings for the impression api
"""
from django.urls import (
    path,
    include
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from impression import views

router = DefaultRouter()
router.register('impression', views.ImpressionViewSet)

app_name = 'impression'

urlpatterns = [
    path('schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path(
        'docs/',
        SpectacularSwaggerView.as_view(url_name='impression:api-schema'),
        name='api-docs',
    ),
    path('', include(router.urls)),
]

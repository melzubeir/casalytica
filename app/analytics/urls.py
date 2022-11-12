"""
url mappings for the impression api
"""
from django.urls import (
    path,
    include
)
from rest_framework.routers import DefaultRouter
from analytics import views

router = DefaultRouter()
router.register('analytics', views.ImpressionViewSet)

app_name = 'analytics'

urlpatterns = [
    path('', include(router.urls)),
]

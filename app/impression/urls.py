"""
url mappings for the impression api
"""
from django.urls import (
    path,
    include
)
from rest_framework.routers import DefaultRouter
from impression import views

router = DefaultRouter()
router.register('impression', views.ImpressionViewSet)

app_name = 'impression'

urlpatterns = [
    path('', include(router.urls)),
]

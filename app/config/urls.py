"""
casalytica's main url mappings
"""
from django.contrib import admin
from config import settings
from django.urls import path, include
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    path("admin/", admin.site.urls),
    path('accounts/', include('allauth.urls')),

    path('schema/', SpectacularAPIView.as_view(), name='api-schema'),
    path('v0/', include('analytics.urls')),
    path('',
         SpectacularSwaggerView.as_view(url_name='api-schema'),
         name='api-docs',
         ),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

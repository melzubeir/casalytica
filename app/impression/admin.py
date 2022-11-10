"""
Impression admin customizations
"""
from django.contrib import admin
from .models import Impression


class ImpressionAdmin(admin.ModelAdmin):

    list_display = ("created", "post_hash", "referer", )


admin.site.register(Impression, ImpressionAdmin)

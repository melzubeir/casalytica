"""
Django admin customizations
"""
from analytics import models
from django.contrib import admin

class ImpressionAdmin(admin.ModelAdmin):
    """Define the admin pages for impressions"""
    list_display = ("created", "post_hash", "referer", )


class PostAdmin(admin.ModelAdmin):
    """Define the admin pages for impressions"""
    list_display = ("post_hash", "impressions_total", )

class CreatorAdmin(admin.ModelAdmin):
    """Define the admin pages for creators"""
    list_display = ("username", "public_key_base58", )

class NodeAdmin(admin.ModelAdmin):
    """Define the admin pages for creators"""
    list_display = ("id", "name", "url", "owner" )


admin.site.register(models.Impression, ImpressionAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Creator, CreatorAdmin)
admin.site.register(models.Node, NodeAdmin)

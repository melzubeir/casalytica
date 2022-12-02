"""
Django admin customizations
"""
from analytics import models
from django.contrib import admin


class ImpressionAdmin(admin.ModelAdmin):
    """Define the admin pages for impressions"""
    list_display = ("created", "remote_addr", "referer", )


class PostAdmin(admin.ModelAdmin):
    """Define the admin pages for impressions"""
    list_display = ("post_hash", "impressions_total", )


class CreatorAdmin(admin.ModelAdmin):
    """Define the admin pages for creators"""
    list_display = ("username", "public_key_base58", )


class NodeAdmin(admin.ModelAdmin):
    """Define the admin pages for nodes"""
    list_display = ("id", "name", "url", "owner")


class OnChainAppAdmin(admin.ModelAdmin):
    """Define the admin pages for on-chain apps"""
    list_display = ("id", "name", "owner", "is_verified")


admin.site.register(models.Impression, ImpressionAdmin)
admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Creator, CreatorAdmin)
admin.site.register(models.Node, NodeAdmin)
admin.site.register(models.OnChainApp, OnChainAppAdmin)

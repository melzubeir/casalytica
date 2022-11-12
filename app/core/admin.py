"""
Django admin customizations
"""
from core import models
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users"""
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'is_active',
                'is_staff',
                'is_superuser',
            ),
        }),
    )


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
admin.site.register(models.User, UserAdmin)

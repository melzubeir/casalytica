"""
Django admin customizations
"""
from core import models
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users"""
    ordering = ['email', 'id']
    list_display = ['email', 'name', 'creator', 'is_staff']
    search_fields = ('email', 'creator')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'creator')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
         'is_reporter', 'is_superuser', 'groups', 'user_permissions',)}),
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
                'is_reporter',
                'is_superuser',
                'creator',
            ),
        }),
    )


admin.site.register(models.User, UserAdmin)

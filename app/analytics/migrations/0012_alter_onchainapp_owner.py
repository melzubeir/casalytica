# Generated by Django 4.1.4 on 2022-12-10 02:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('analytics', '0011_remove_creator_follower_remove_creator_following_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='onchainapp',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]

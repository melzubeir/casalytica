# Generated by Django 4.1.3 on 2022-12-05 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0004_creator_follower_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='creator',
            name='follower',
            field=models.ManyToManyField(blank=True, null=True, related_name='followers', to='analytics.creator'),
        ),
        migrations.AddField(
            model_name='creator',
            name='following',
            field=models.ManyToManyField(blank=True, null=True, related_name='followings', to='analytics.creator'),
        ),
    ]

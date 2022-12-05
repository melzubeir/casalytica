# Generated by Django 4.1.3 on 2022-12-05 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0003_creator_description_creator_featured_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='creator',
            name='follower_count',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='follower_count_3rd_degree',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='follower_engagement',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='in_degree_engagement',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='in_degree_reach',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='last_sync',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='post_frequency_daily',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='qualification',
            field=models.IntegerField(blank=True, choices=[(1, 'Irrelevant'), (2, 'Semi Relevant'), (3, 'Relevant'), (4, 'Celebrity')], default=1, null=True),
        ),
        migrations.AddField(
            model_name='creator',
            name='relevant_posts_percentage',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='node',
            name='last_sync',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='has_image',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='has_link',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='has_text',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='post',
            name='has_video',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='last_sync',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='sentiment_score',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='type',
            field=models.IntegerField(blank=True, choices=[(1, 'Curated'), (2, 'Promotional'), (3, 'Informational'), (4, 'Interactive'), (5, 'Call to Action'), (7, 'Profile'), (6, 'Other')], default=1, null=True),
        ),
    ]

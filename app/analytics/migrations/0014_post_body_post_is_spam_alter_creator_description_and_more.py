# Generated by Django 4.1.4 on 2022-12-11 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0013_alter_post_sentiment_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='body',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='post',
            name='is_spam',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='creator',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='creator',
            name='featured_image',
            field=models.URLField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='creator',
            name='profile_image',
            field=models.URLField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='browser_family',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='browser_version',
            field=models.CharField(blank=True, default='', max_length=14),
        ),
        migrations.AlterField(
            model_name='impression',
            name='city',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='country',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='creator_handle',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='device_brand',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='device_family',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='device_model',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='os_family',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='os_version',
            field=models.CharField(blank=True, default='', max_length=14),
        ),
        migrations.AlterField(
            model_name='impression',
            name='referer',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='remote_addr',
            field=models.GenericIPAddressField(blank=True, null=True, unpack_ipv4=True),
        ),
        migrations.AlterField(
            model_name='impression',
            name='tz',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='impression',
            name='user_agent',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='onchainapp',
            name='app_store_url',
            field=models.URLField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='onchainapp',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='onchainapp',
            name='google_store_url',
            field=models.URLField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='onchainapp',
            name='url',
            field=models.URLField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='post',
            name='sentiment_score',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]

# Generated by Django 4.1.3 on 2022-11-30 23:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0002_initial'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='analytics.creator'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_reporter',
            field=models.BooleanField(default=False),
        ),
    ]

# Generated by Django 4.1.3 on 2022-11-12 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='node',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='analytics.node'),
            preserve_default=False,
        ),
    ]

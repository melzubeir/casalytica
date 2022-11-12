# Generated by Django 4.1.3 on 2022-11-12 03:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_node'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='name',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='node',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.creator'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='node',
            name='url',
            field=models.URLField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]

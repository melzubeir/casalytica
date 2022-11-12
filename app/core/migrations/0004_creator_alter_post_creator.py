# Generated by Django 4.1.3 on 2022-11-12 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_post_impression_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='Creator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('public_key_base58', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.creator'),
        ),
    ]

# Generated by Django 5.1.4 on 2025-01-13 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0009_delete_team'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_team_alias',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='favorite_team_name',
            field=models.CharField(blank=True, max_length=155, null=True),
        ),
    ]

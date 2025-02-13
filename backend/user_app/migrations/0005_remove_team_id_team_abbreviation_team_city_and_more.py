# Generated by Django 5.1.4 on 2025-01-13 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0004_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='id',
        ),
        migrations.AddField(
            model_name='team',
            name='abbreviation',
            field=models.CharField(default='TNA', max_length=3, unique=True),
        ),
        migrations.AddField(
            model_name='team',
            name='city',
            field=models.CharField(default='City', max_length=128),
        ),
        migrations.AddField(
            model_name='team',
            name='logo_url',
            field=models.URLField(blank=True, default='NA', null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='team_id',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.CharField(default='Team Name', max_length=128),
        ),
    ]

# Generated by Django 5.1.4 on 2025-01-13 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0005_remove_team_id_team_abbreviation_team_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
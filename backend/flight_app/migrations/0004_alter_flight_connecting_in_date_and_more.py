# Generated by Django 5.1.4 on 2025-01-13 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flight_app', '0003_alter_flight_connecting_in_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='connecting_in_date',
            field=models.CharField(default='no connection', null=True),
        ),
        migrations.AlterField(
            model_name='flight',
            name='connecting_location_in',
            field=models.CharField(default='no connection', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='flight',
            name='connecting_location_out',
            field=models.CharField(default='no connection', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='flight',
            name='connecting_out_date',
            field=models.CharField(default='no connection', null=True),
        ),
    ]

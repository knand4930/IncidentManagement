# Generated by Django 5.0.6 on 2024-06-11 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0007_alter_incident_reporter"),
    ]

    operations = [
        migrations.AlterField(
            model_name="incident",
            name="details",
            field=models.TextField(blank=True, null=True),
        ),
    ]

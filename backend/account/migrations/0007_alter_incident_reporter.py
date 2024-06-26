# Generated by Django 5.0.6 on 2024-06-11 04:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0006_incident"),
    ]

    operations = [
        migrations.AlterField(
            model_name="incident",
            name="reporter",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="incidents",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]

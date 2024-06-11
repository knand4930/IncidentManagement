# Generated by Django 5.0.6 on 2024-06-10 19:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_alter_user_options_user_address_user_city_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="assign_user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
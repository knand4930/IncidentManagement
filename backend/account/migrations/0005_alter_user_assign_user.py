# Generated by Django 5.0.6 on 2024-06-10 19:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0004_remove_user_assign_user_user_assign_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="assign_user",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]

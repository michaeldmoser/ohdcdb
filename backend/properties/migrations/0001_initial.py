# Generated by Django 4.0.1 on 2022-04-06 12:39

import address.models
from django.db import migrations, models
import django.db.models.deletion


# pylint: disable=missing-class-docstring
class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Properties',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('acres', models.DecimalField(decimal_places=3, max_digits=5)),
                ('date_entered', models.DateTimeField(auto_now_add=True)),
                ('address', address.models.AddressField(blank=True, null=True,
                 on_delete=django.db.models.deletion.SET_NULL, to='address.address')),
            ],
        ),
    ]

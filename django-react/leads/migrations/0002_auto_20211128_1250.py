# Generated by Django 3.2.9 on 2021-11-28 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='lead',
            name='message',
        ),
    ]
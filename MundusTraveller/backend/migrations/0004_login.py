# Generated by Django 3.2.9 on 2021-12-12 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_createusermodel_dob'),
    ]

    operations = [
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default=None, max_length=254)),
                ('password', models.CharField(default=None, max_length=200)),
            ],
        ),
    ]

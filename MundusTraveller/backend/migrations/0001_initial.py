# Generated by Django 3.2.9 on 2021-12-15 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CreateUserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(default=None, max_length=200)),
                ('lastname', models.CharField(default=None, max_length=200)),
                ('password', models.CharField(default=None, max_length=200)),
                ('confirmPassword', models.CharField(max_length=200)),
                ('email', models.EmailField(default=None, max_length=254)),
                ('DOB', models.CharField(default=None, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default=None, max_length=254)),
                ('password', models.CharField(default=None, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ReviewModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(default=None, max_length=254)),
                ('review', models.CharField(max_length=500)),
                ('rating', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='UpdateReviewModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('oldContent', models.CharField(max_length=500)),
                ('newContent', models.CharField(max_length=500)),
            ],
        ),
    ]

# Generated by Django 4.1.5 on 2023-12-16 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_noteuser_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='userId',
            field=models.TextField(blank=True, null=True),
        ),
    ]
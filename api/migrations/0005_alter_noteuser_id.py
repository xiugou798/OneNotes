# Generated by Django 4.1.5 on 2023-12-16 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_note_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='noteuser',
            name='id',
            field=models.UUIDField(default='781e5f26e9704ffcb101fa970e1b9e9f', editable=False, primary_key=True, serialize=False),
        ),
    ]

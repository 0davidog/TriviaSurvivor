# Generated by Django 4.2.9 on 2025-06-05 12:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0002_remove_film_studio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='film',
        ),
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='answer', to='data.film'),
        ),
        migrations.AlterField(
            model_name='question',
            name='option_a',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='option_a', to='data.film'),
        ),
        migrations.AlterField(
            model_name='question',
            name='option_b',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='option_b', to='data.film'),
        ),
        migrations.AlterField(
            model_name='question',
            name='option_c',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='option_c', to='data.film'),
        ),
    ]

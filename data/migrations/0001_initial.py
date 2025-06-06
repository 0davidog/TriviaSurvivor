# Generated by Django 4.2.9 on 2025-05-01 13:42

from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Film',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('year', models.IntegerField(blank=True)),
                ('director', models.CharField(blank=True)),
                ('origin', django_countries.fields.CountryField(max_length=2)),
                ('studio', models.CharField(blank=True)),
                ('imdb', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre_name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField()),
                ('option_a', models.CharField()),
                ('option_b', models.CharField()),
                ('option_c', models.CharField()),
                ('answer', models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C,', 'C')])),
                ('film', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='data.film')),
                ('genre', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='data.genre')),
            ],
        ),
        migrations.AddField(
            model_name='film',
            name='genre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='data.genre'),
        ),
    ]

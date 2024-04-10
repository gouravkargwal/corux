# Generated by Django 5.0.4 on 2024-04-09 03:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0002_paymenttable"),
    ]

    operations = [
        migrations.AlterField(
            model_name="paymenttable",
            name="AMOUNT",
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name="useradmintable",
            name="BALANCE",
            field=models.FloatField(default=0),
        ),
    ]
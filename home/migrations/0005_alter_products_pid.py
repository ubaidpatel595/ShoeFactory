# Generated by Django 4.1.2 on 2022-11-23 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_alter_products_delivery_alter_products_mrp_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='pid',
            field=models.TextField(default='', primary_key=True, serialize=False),
        ),
    ]

# Generated by Django 5.0.4 on 2024-06-14 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mycoffee', '0003_item_cart'),
    ]

    operations = [
        migrations.CreateModel(
            name='SideDish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.URLField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
        ),
        migrations.DeleteModel(
            name='Cart',
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]